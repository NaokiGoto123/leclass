import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';

@Component({
  selector: 'app-languageandliterature-sl',
  templateUrl: './languageandliterature-sl.component.html',
  styleUrls: ['./languageandliterature-sl.component.scss']
})
export class LanguageandliteratureSlComponent implements OnInit {

  lessons: Lesson[];

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.lessonGetService.getSpecificLessons('Language & Literature HL').subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
    });
  }

  ngOnInit(): void {
  }

}
