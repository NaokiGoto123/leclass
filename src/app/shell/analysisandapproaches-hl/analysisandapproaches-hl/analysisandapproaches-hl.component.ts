import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-analysisandapproaches-hl',
  templateUrl: './analysisandapproaches-hl.component.html',
  styleUrls: ['./analysisandapproaches-hl.component.scss']
})
export class AnalysisandapproachesHlComponent implements OnInit {

  lessons: Observable<Lesson[]>;

  initialLoading: boolean;

  constructor(
    private lessonGetService: LessonGetService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Analytics and approaches' },
      { property: 'og:title', content: 'Analytics and approaches' },
      { property: 'og:description', content: 'Analytics and approaches'},
      { property: 'og:url', content: location.href },
    ]);

    this.initialLoading = true;
    this.lessons = this.lessonGetService.getSpecificLessons('Analysis & Approaches Hl');
    setTimeout(() => {
      this.initialLoading = false;
    }, 500);
  }

  ngOnInit(): void {
  }

}
