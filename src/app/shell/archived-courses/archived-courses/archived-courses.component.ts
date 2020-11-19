import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { Subject } from 'src/app/interfaces/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-archived-courses',
  templateUrl: './archived-courses.component.html',
  styleUrls: ['./archived-courses.component.scss']
})
export class ArchivedCoursesComponent implements OnInit {

  archivedCourses: Subject[] = [];

  initialLoading: boolean;

  constructor(
    private subjectService: SubjectService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Archived courses | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Archived courses' },
      { property: 'og:title', content: 'Archived courses' },
      { property: 'og:description', content: 'Archived courses' },
      { property: 'og:url', content: location.href },
      {
        property: 'og:image',
        content: 'https://leclass-prod.web.app/assets/images/leclass.jpg',
      },
    ]);

    this.subjectService.getSubjects().pipe(
    take(1))
    .subscribe((subjects: Subject[]) => {
      subjects.map((subject: Subject) => {
        console.log(subject.name);
        if (subject.archived) {
          this.archivedCourses.push(subject);
        }
      });
    });
  }

  ngOnInit(): void {
  }

}
