import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-economics-sl',
  templateUrl: './economics-sl.component.html',
  styleUrls: ['./economics-sl.component.scss']
})
export class EconomicsSlComponent implements OnInit {

  lessons: Observable<Lesson[]>;

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Economics' },
      { property: 'og:title', content: 'Economics' },
      { property: 'og:description', content: 'Economics'},
      { property: 'og:url', content: location.href },
    ]);

    this.initialLoading = true;
    this.lessons = this.lessonGetService.getSpecificLessons('Economics HL');
    setTimeout(() => {
      this.initialLoading = false;
    }, 500);
  }

  ngOnInit(): void {
  }

}
