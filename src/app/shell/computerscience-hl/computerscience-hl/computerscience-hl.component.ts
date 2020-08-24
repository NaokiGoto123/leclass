import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-computerscience-hl',
  templateUrl: './computerscience-hl.component.html',
  styleUrls: ['./computerscience-hl.component.scss']
})
export class ComputerscienceHlComponent implements OnInit {

  lessons: Observable<Lesson[]>;

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService
  ) {
    this.initialLoading = true;
    this.lessons = this.lessonGetService.getSpecificLessons('Computer Science HL');
    setTimeout(() => {
      this.initialLoading = false;
    }, 500);
  }

  ngOnInit(): void {
  }

}
