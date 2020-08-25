import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-japanese-sl',
  templateUrl: './japanese-sl.component.html',
  styleUrls: ['./japanese-sl.component.scss']
})
export class JapaneseSlComponent implements OnInit {

  lessons: Observable<Lesson[]>;

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Japanese' },
      { property: 'og:title', content: 'Japanese' },
      { property: 'og:description', content: 'Japanese'},
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
