import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'src/app/interfaces/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  initialLoading: boolean;

  private subjects: Observable<Subject[]>;

  dpSubjects: Observable<Subject[]>;

  mypSubjects: Observable<Subject[]>;

  otherSubjects: Observable<Subject[]>;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private subjectService: SubjectService
  ) {
    this.titleService.setTitle('Home | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Home' },
      { property: 'og:title', content: 'Home' },
      { property: 'og:description', content: 'Home' },
      { property: 'og:url', content: location.href },
      {
        property: 'og:image',
        content: 'https://leclass-prod.web.app/assets/images/leclass.jpg',
      },
    ]);

    this.subjects = this.subjectService.getSubjects();

    this.dpSubjects = this.subjects.pipe(
      map((subjects: Subject[]) => {
        const result: Subject[] = [];
        subjects.map((subject: Subject) => {
          if (subject.curriculum === 'DP' && subject.archived === false) {
            result.push(subject);
          }
        });
        return result;
      })
    );

    this.mypSubjects = this.subjects.pipe(
      map((subjects: Subject[]) => {
        const result: Subject[] = [];
        subjects.map((subject: Subject) => {
          if (subject.curriculum === 'MYP' && subject.archived === false) {
            result.push(subject);
          }
        });
        return result;
      })
    );

    this.otherSubjects = this.subjects.pipe(
      map((subjects: Subject[]) => {
        const result: Subject[] = [];
        subjects.map((subject: Subject) => {
          if (subject.curriculum === 'Other' && subject.archived === false) {
            result.push(subject);
          }
        });
        return result;
      })
    );
  }

  ngOnInit(): void {}
}
