import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ib-dp',
  templateUrl: './ib-dp.component.html',
  styleUrls: ['./ib-dp.component.scss']
})
export class IbDpComponent implements OnInit {

  lessons: Observable<Lesson[]>;

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass');

    this.meta.addTags([
      { name: 'description', content: 'IB DP' },
      { property: 'og:title', content: 'IB DP' },
      { property: 'og:description', content: 'IB DP'},
      { property: 'og:url', content: location.href },
    ]);

    this.initialLoading = true;
    this.lessons = this.lessonGetService.getSpecificLessons('Japanese SL');
    setTimeout(() => {
      this.initialLoading = false;
    }, 500);
  }

  ngOnInit(): void {
  }

}
