import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';

@Component({
  selector: 'app-computerscience-hl',
  templateUrl: './computerscience-hl.component.html',
  styleUrls: ['./computerscience-hl.component.scss']
})
export class ComputerscienceHlComponent implements OnInit {

  lessons: Lesson[];

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.initialLoading = true;
    this.lessonGetService.getSpecificLessons('Computer Science HL').subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
      setTimeout(() => {
        this.initialLoading = false;
      }, 500);
    });
  }

  ngOnInit(): void {
  }

}
