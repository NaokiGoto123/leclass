import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-economics-sl',
  templateUrl: './economics-sl.component.html',
  styleUrls: ['./economics-sl.component.scss']
})
export class EconomicsSlComponent implements OnInit {

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
