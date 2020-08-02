import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';

@Component({
  selector: 'app-economics-sl',
  templateUrl: './economics-sl.component.html',
  styleUrls: ['./economics-sl.component.scss']
})
export class EconomicsSlComponent implements OnInit {

  lessons: Lesson[];

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.lessonGetService.getSpecificLessons('Economics HL').subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
    });
  }

  ngOnInit(): void {
  }

}
