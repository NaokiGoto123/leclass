import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';

@Component({
  selector: 'app-japanese-sl',
  templateUrl: './japanese-sl.component.html',
  styleUrls: ['./japanese-sl.component.scss']
})
export class JapaneseSlComponent implements OnInit {

  lessons: Lesson[];

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.lessonGetService.getSpecificLessons('Japanese SL').subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
    });
  }

  ngOnInit(): void {
  }

}
