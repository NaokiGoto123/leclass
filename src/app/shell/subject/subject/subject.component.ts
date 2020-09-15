import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {

  lessons: Lesson[];

  initialLoading: boolean;

  subscription: Subscription;

  constructor(
    private lessonGetService: LessonGetService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private meta: Meta
  ) {
    this.initialLoading = true;
    this.subscription = this.activatedRoute.queryParamMap.pipe(
      switchMap((params) => {
        const subject = params.get('subject');

        this.titleService.setTitle(`Leclass | ${subject}`);

        this.meta.addTags([
          { name: 'description', content: `Subject | ${subject}` },
          { property: 'og:title', content: `Subject | ${subject}` },
          { property: 'og:description', content: `Subject | ${subject}` },
          { property: 'og:url', content: location.href },
          { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
        ]);

        return this.lessonGetService.getSpecificLessons(subject);
      }))
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        this.initialLoading = false;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
