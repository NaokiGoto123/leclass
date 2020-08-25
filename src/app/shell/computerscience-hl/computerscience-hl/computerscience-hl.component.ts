import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-computerscience-hl',
  templateUrl: './computerscience-hl.component.html',
  styleUrls: ['./computerscience-hl.component.scss']
})
export class ComputerscienceHlComponent implements OnInit {

  lessons: Observable<Lesson[]>;

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Computer science' },
      { property: 'og:title', content: 'Computer science' },
      { property: 'og:description', content: 'Computer science'},
      { property: 'og:url', content: location.href },
    ]);

    this.initialLoading = true;
    this.lessons = this.lessonGetService.getSpecificLessons('Computer Science HL');
    setTimeout(() => {
      this.initialLoading = false;
    }, 500);
  }

  ngOnInit(): void {
  }

}
