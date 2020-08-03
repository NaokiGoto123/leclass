import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';

@Component({
  selector: 'app-physics-hl',
  templateUrl: './physics-hl.component.html',
  styleUrls: ['./physics-hl.component.scss']
})
export class PhysicsHlComponent implements OnInit {

  lessons: Lesson[];

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.lessonGetService.getSpecificLessons('Physics HL').subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
    });
  }

  ngOnInit(): void {
  }

}
