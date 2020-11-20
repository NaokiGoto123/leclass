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
import { switchMap, take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { Subject } from 'src/app/interfaces/subject';
import { SubjectService } from 'src/app/services/subject.service';
@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss'],
})
export class CreateLessonComponent implements OnInit {
  uniqueId = this.db.createId();
  lesson: Lesson;
  titleMaxLength = 70;
  form = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.maxLength(this.titleMaxLength)],
    ],
    content: ['', [Validators.required]],
    loomLink: ['', [Validators.required]],
    subjectId: ['', [Validators.required]],
    isPublic: [true],
  });
  isComplete: boolean;
  subjects: Subject[] = [];

  imageChangedEvent: any = '';
  croppedImage: any = '';

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
    private titleService: Title,
    private meta: Meta,
    private subjectService: SubjectService
  ) {
    this.titleService.setTitle('Create lesson | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Create lesson' },
      { property: 'og:title', content: 'Create lesson' },
      { property: 'og:description', content: 'Create lesson' },
      { property: 'og:url', content: location.href },
      {
        property: 'og:image',
        content: 'https://leclass-prod.web.app/assets/images/leclass.jpg',
      },
    ]);

    this.subjectService
      .getSubjects()
      .pipe(take(1))
      .subscribe((subjects: Subject[]) => {
        subjects.map((subject: Subject) => {
          if (!subject.archived) {
            this.subjects.push(subject);
          }
        });
      });

    this.activatedRoute.queryParamMap
      .pipe(
        take(1),
        switchMap((params) => {
          return this.lessonGetService.getLesson(params.get('id'));
        })
      )
      .subscribe((lesson: Lesson) => {
        if (lesson) {
          this.form.patchValue(lesson);
          this.croppedImage = lesson.thumbnail;
          this.lesson = lesson;
        }
      });
  }

  ngOnInit(): void {}

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
    const photoURL = await this.upload(this.croppedImage);
    this.lessonService.createLesson({
      id: this.uniqueId,
      title: this.form.value.title,
      thumbnail: photoURL,
      content: this.form.value.content,
      loomLink: this.form.value.loomLink,
      createrId: this.authService.user.uid,
      subjectId: this.form.value.subjectId,
      isPublic: this.form.value.isPublic,
    });
  }

  private async updateLesson() {
    this.lessonService.updateLesson({
      ...this.lesson,
      title: this.form.value.title,
      content: this.form.value.content,
      loomLink: this.form.value.loomLink,
      subjectId: this.form.value.subjectId,
      isPublic: this.form.value.isPublic,
    });
  }

  async upload(base64: string): Promise<string> {
    const time: number = new Date().getTime();
    const ref = this.storage.ref(`lessons/${this.uniqueId}/images/${time}`);
    const result = await ref.putString(base64, 'data_url');
    return result.ref.getDownloadURL();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: this.lesson.id,
      },
    });
  }
}
