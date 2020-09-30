import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LessonService } from 'src/app/services/lesson.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as tus from 'tus-js-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap, take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent implements OnInit {

  uniqueId = this.db.createId();
  lesson: Lesson;
  titleMaxLength = 30;
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(this.titleMaxLength)]],
    content: [''],
    subject: ['', [Validators.required]],
    isPublic: [true]
  });
  isComplete: boolean;
  subjects = [
    'Language & Literature',
    'Analysis & Approaches',
    'Japanese',
    'Physics',
    'Computer Science',
    'Economics',
    'Theory of Knowledge',
    'IB DP'
  ];

  imageChangedEvent: any = '';
  croppedImage: any = '';

  token = environment.vimeo.token;
  isUploadingComplete: boolean;
  file: File;
  uploadUrl: string;
  videoUrl: string;
  videoId: number;
  playerUrl: string;

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private lessonService: LessonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lessonGetService: LessonGetService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private titleService: Title,
    private meta: Meta,
  ) {
    this.titleService.setTitle('Create lesson | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Create lesson' },
      { property: 'og:title', content: 'Create lesson' },
      { property: 'og:description', content: 'Create lesson'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);

    this.activatedRoute.queryParamMap.pipe(
      take(1),
      switchMap((params) => {
        return this.lessonGetService.getLesson(params.get('id'));
      }))
      .subscribe((lesson: Lesson) => {
        if (lesson) {
          this.form.patchValue(lesson);
          this.croppedImage = lesson.thumbnail;
          this.lesson = lesson;
        }
      });
  }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = 'Your work will be lost. Is it okay?';
    }
  }

  get titleControl() {
    return this.form.get('title');
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  loadImageFailed() {
    this.snackBar.open('Failed to load image');
  }

  createVideo(event) {
    this.file = event.target.files[0];

    this.http.post(
      'https://api.vimeo.com/me/videos',
      { upload: { approach: 'tus', size: this.file.size } },
      { headers: new HttpHeaders({ Authorization: `bearer ${this.token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.vimeo.*+json;version=3.4' }) }
    )
      .subscribe((res: any) => {
        this.uploadUrl = res.upload.upload_link;
        this.videoUrl = res.link;
        this.videoId = +this.videoUrl.substring(this.videoUrl.lastIndexOf('/') + 1);
        this.playerUrl = `https://player.vimeo.com/video/${this.videoId}`;
      });
  }

  async submit() {
    this.snackBar.open('Saving in process');

    if (this.lesson) {
      await this.updateLesson();
    } else {
      await this.createLesson();
    }

    this.isComplete = true;
    this.snackBar.open('Successfully saved');
    this.router.navigateByUrl('/');
  }

  private async createLesson() {
    await this.uploadVideo();
    const photoURL = await this.upload(
      this.croppedImage
    );
    this.lessonService.createLesson({
      id: this.uniqueId,
      title: this.form.value.title,
      thumbnail: photoURL,
      playerUrl: this.playerUrl,
      videoId: this.videoId.toString(),
      content: this.form.value.content,
      createrId: this.authService.user.uid,
      subject: this.form.value.subject,
      isPublic: this.form.value.isPublic
    });
  }

  private async updateLesson() {
    this.lessonService.updateLesson({
      ...this.lesson,
      title: this.form.value.title,
      content: this.form.value.content,
      subject: this.form.value.subject,
      isPublic: this.form.value.isPublic
    });
  }

  async upload(base64: string): Promise<string> {
    const time: number = new Date().getTime();
    const ref = this.storage.ref(`lessons/${this.uniqueId}/images/${time}`);
    const result = await ref.putString(base64, 'data_url');
    return result.ref.getDownloadURL();
  }

  private async uploadVideo() {
    this.isUploadingComplete = false;
    const upload = new tus.Upload(this.file, {
      uploadUrl: this.uploadUrl,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      onError: (error) => {
        this.snackBar.open(`Error: ${error}`);
      },
      onSuccess: () => {
        this.isUploadingComplete = true;
      },
    });
    upload.start();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: this.lesson.id,
        videoId: this.lesson.videoId
      }
    });
  }
}
