import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/interfaces/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  user: User;

  isShowing = true;

  dpSubjects: Observable<Subject[]>;

  mypSubjects: Observable<Subject[]>;

  otherSubjects: Observable<Subject[]>;

  constructor(
    private authService: AuthService,
    private subjectService: SubjectService,
    @Inject(DOCUMENT) private rootDocument: HTMLDocument
  ) {
    this.authService.user$.subscribe((user: User) => {
      this.user = user;
    });

    this.dpSubjects = this.subjectService.getSubjects().pipe(
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

    this.mypSubjects = this.subjectService.getSubjects().pipe(
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

    this.otherSubjects = this.subjectService.getSubjects().pipe(
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

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }
}
