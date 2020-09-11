import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {

  lessons: Lesson[];

  initialLoading: boolean;

  subscription: Subscription;

  constructor(
    private lessonGetService: LessonGetService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialLoading = true;
    this.subscription = this.activatedRoute.queryParamMap.pipe(
      switchMap((params) => {
        const subject = params.get('subject');
        return this.lessonGetService.getSpecificLessons(subject);
      }))
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        this.initialLoading = false;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
