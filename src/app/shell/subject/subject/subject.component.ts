import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/interfaces/subject';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {

  subject: Subject;

  lessons: Lesson[];

  initialLoading: boolean;

  subscription: Subscription;

  constructor(
    private lessonGetService: LessonGetService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    private subjectService: SubjectService,
    public authService: AuthService
  ) {
    this.initialLoading = true;
    this.subscription = this.activatedRoute.queryParamMap.pipe(
      switchMap((params) => {
        const subjectId = params.get('id');

        return this.subjectService.getSubject(subjectId);
      }),
      switchMap((subject: Subject) => {

        this.subject = subject;

        this.titleService.setTitle(`${subject.name} | Leclass`);

        this.meta.addTags([
          { name: 'description', content: `Subject | ${subject.name}` },
          { property: 'og:title', content: `Subject | ${subject.name}` },
          { property: 'og:description', content: `Subject | ${subject.name}` },
          { property: 'og:url', content: location.href },
          { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
        ]);

        return this.lessonGetService.getSpecificLessons(subject.id);
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
