import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LessonService } from 'src/app/services/lesson.service';
import { AuthService } from 'src/app/services/auth.service';
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
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss'],
})
export class CreateLessonComponent implements OnInit {
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
    number: [null, [Validators.required]],
    isPublic: [true],
  });
  isComplete: boolean;
  subjects: Subject[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private lessonService: LessonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lessonGetService: LessonGetService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private meta: Meta,
    private subjectService: SubjectService,
    public locationService: Location
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

  async submit() {
    this.isComplete = true;
    this.snackBar.open('Saving in progress');
    this.router.navigateByUrl('/');
    if (this.lesson) {
      await this.updateLesson();
    } else {
      await this.createLesson();
    }
    this.snackBar.open('Successfully saved!');
  }

  private async createLesson() {
    this.lessonService.createLesson({
      title: this.form.value.title,
      content: this.form.value.content,
      loomLink: this.form.value.loomLink,
      createrId: this.authService.user.uid,
      subjectId: this.form.value.subjectId,
      number: this.form.value.number,
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
      number: this.form.value.number,
      isPublic: this.form.value.isPublic,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: this.lesson.id,
      },
    });
  }
}
