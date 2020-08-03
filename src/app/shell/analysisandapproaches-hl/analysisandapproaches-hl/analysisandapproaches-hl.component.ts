import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';

@Component({
  selector: 'app-analysisandapproaches-hl',
  templateUrl: './analysisandapproaches-hl.component.html',
  styleUrls: ['./analysisandapproaches-hl.component.scss']
})
export class AnalysisandapproachesHlComponent implements OnInit {

  lessons: Lesson[];

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.lessonGetService.getSpecificLessons('Analysis & Approaches Hl').subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
    });
  }

  ngOnInit(): void {
  }

}
