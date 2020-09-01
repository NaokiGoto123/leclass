import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  lessons: Lesson[];

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialLoading = true;
    this.activatedRoute.queryParamMap.pipe(
      switchMap((params) => {
        const subject = params.get('subject');
        return this.lessonGetService.getSpecificLessons(subject);
      }))
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        setTimeout(() => {
          this.initialLoading = false;
        }, 500);
      });
  }

  ngOnInit(): void {
  }

}
