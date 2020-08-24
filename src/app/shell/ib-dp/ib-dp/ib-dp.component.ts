import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';

@Component({
  selector: 'app-ib-dp',
  templateUrl: './ib-dp.component.html',
  styleUrls: ['./ib-dp.component.scss']
})
export class IbDpComponent implements OnInit {

  lessons: Observable<Lesson[]>;

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.initialLoading = true;
    this.lessons = this.lessonGetService.getSpecificLessons('Japanese SL');
    setTimeout(() => {
      this.initialLoading = false;
    }, 500);
  }

  ngOnInit(): void {
  }

}
