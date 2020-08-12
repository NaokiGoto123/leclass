import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-analysisandapproaches-hl',
  templateUrl: './analysisandapproaches-hl.component.html',
  styleUrls: ['./analysisandapproaches-hl.component.scss']
})
export class AnalysisandapproachesHlComponent implements OnInit {

  lessons: Lesson[];

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.initialLoading = true;
    this.lessonGetService.getSpecificLessons('Analysis & Approaches Hl').subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
      setTimeout(() => {
        this.initialLoading = false;
      }, 500);
    });
  }

  ngOnInit(): void {
  }

}
