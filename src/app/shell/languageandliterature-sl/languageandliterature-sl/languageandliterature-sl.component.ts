import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-languageandliterature-sl',
  templateUrl: './languageandliterature-sl.component.html',
  styleUrls: ['./languageandliterature-sl.component.scss']
})
export class LanguageandliteratureSlComponent implements OnInit {

  lessons: Observable<Lesson[]>;

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.initialLoading = true;
    this.lessons = this.lessonGetService.getSpecificLessons('Economics HL');
    setTimeout(() => {
      this.initialLoading = false;
    }, 500);
  }

  ngOnInit(): void {
  }

}
