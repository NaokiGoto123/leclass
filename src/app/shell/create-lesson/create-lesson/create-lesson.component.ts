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
@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent implements OnInit {

  uniqueId = this.db.createId();

  lesson: Lesson;

  form = this.fb.group({
    title: ['', [Validators.required]],
    content: [''],
    subject: ['', [Validators.required]],
    isPublic: [true]
  });

  isComplete: boolean;

  subjects = [
    'Language & Literature HL',
    'Analysis & Approaches Hl',
    'Japanese SL',
    'Physics HL',
    'Computer Science HL',
    'Economics HL',
    'Theory of Knowledge'
  ];

  imageChangedEvent: any = '';

  croppedImage: any = '';

  token = environment.vimeo.token;
  percentage: string;
  file: File;
  endpoint: string;
  videoUrl: string;
  isUploadingComplete: boolean;
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
    private http: HttpClient
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.lessonGetService.getLesson(id).subscribe((lesson: Lesson) => {
        if (lesson) {
          this.form.patchValue(lesson);
          this.croppedImage = lesson.thumbnail;
          this.lesson = lesson;
        }
      });
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    console.log('image is loaded');
  }
  cropperReady() {
    console.log('cropper is ready');
  }
  loadImageFailed() {
    console.log('error occured');
  }

  // Vimeo上に動画を作成（アップロードの前処理）
  createVideo(event) {
    this.file = event.target.files[0];
    console.log(event.target.files[0]);

    this.http.post('https://api.vimeo.com/me/videos',
        {
          upload: {
            approach: 'tus',
            size: this.file.size,
          }
        },
        {
          headers: new HttpHeaders({
            Authorization: `bearer ${this.token}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.vimeo.*+json;version=3.4',
          }),
        }
      )
      .subscribe((res: any) => {
        console.log(res);
        // アップロード用URL
        this.endpoint = res.upload.upload_link;
        // Vimeo上の動画URL
        this.videoUrl = res.link;
        // 動画URLから動画IDを抽出
        this.videoId = +this.videoUrl.substring(
          this.videoUrl.lastIndexOf('/') + 1
        );
        this.playerUrl = `https://player.vimeo.com/video/${this.videoId}`;
      });
  }

  uploadVideo() {
    this.isUploadingComplete = false;
    const upload = new tus.Upload(this.file, {
      uploadUrl: this.endpoint,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      onError: (error) => {
        console.log('Failed because: ' + error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        this.percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      },
      onSuccess: () => {
        this.isUploadingComplete = true;
        this.snackBar.open('Video is successfully uploaded!', 'Close', { duration: 5000 });
      },
    });
    upload.start();
  }

  async upload(id: string, base64: string): Promise<string> {
    const time: number = new Date().getTime();
    const ref = this.storage.ref(`lessons/${this.uniqueId}/images/${time}`);
    const result = await ref.putString(base64, 'data_url');
    return result.ref.getDownloadURL();
  }

  async submit() {
    if (this.lesson) {
      this.snackBar.open('Saving in process', 'Close', { duration: 5000 });
      this.update();
    } else if (!this.endpoint) {
      this.snackBar.open('Video is not readt', 'Close', { duration: 5000 });
    } else {
      this.snackBar.open('Saving in process', 'Close', { duration: 5000 });
      console.log(this.videoUrl);
      console.log(this.playerUrl);
      const photoURL = await this.upload(
        this.uniqueId,
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
      this.isComplete = true;
      this.snackBar.open('Successfully saved', 'Close', { duration: 5000 });
      this.router.navigateByUrl('/');
    }
  }

  private async update() {
    console.log(this.form.value);
    this.lessonService.updateLesson({
      ...this.lesson,
      title: this.form.value.title,
      content: this.form.value.content,
      subject: this.form.value.subject,
      isPublic: this.form.value.isPublic
    });
    this.isComplete = true;
    this.router.navigateByUrl('/');
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: this.lesson.id,
        videoId: this.lesson.videoId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
