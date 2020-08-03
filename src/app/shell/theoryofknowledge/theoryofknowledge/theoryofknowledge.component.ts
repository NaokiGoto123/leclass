import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';

@Component({
  selector: 'app-theoryofknowledge',
  templateUrl: './theoryofknowledge.component.html',
  styleUrls: ['./theoryofknowledge.component.scss']
})
export class TheoryofknowledgeComponent implements OnInit {

  lessons: Lesson[];

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.lessonGetService.getSpecificLessons('Theory of Knowledge').subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
    });
  }

  ngOnInit(): void {
  }

}
