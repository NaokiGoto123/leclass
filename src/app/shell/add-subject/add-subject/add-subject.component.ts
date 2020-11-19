import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Subject } from 'src/app/interfaces/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  subject: Subject;

  form = this.fb.group({
    name: ['', [Validators.required]],
    archived: [true]
  });

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle('Add subject | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Report' },
      { property: 'og:title', content: 'Report' },
      { property: 'og:description', content: 'Report' },
      { property: 'og:url', content: location.href },
      {
        property: 'og:image',
        content: 'https://leclass-prod.web.app/assets/images/leclass.jpg',
      },
    ]);

    this.activatedRoute.queryParamMap
      .pipe(
        take(1),
        switchMap((params) => {
          return this.subjectService.getSubject(params.get('id'));
        })
      )
      .subscribe((subject: Subject) => {
        this.subject = subject;
        this.form.patchValue(subject);
      });
  }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = 'Your work will be lost. Is it okay?';
    }
  }

  addSubject() {
    if (this.subject) {
      this.updateSubject();
    }
    else {
      this.subjectService.addSubject({
        name: this.form.value.name
      });
      this.router.navigateByUrl('/');
    }
  }

  updateSubject() {
    this.subjectService.updateSubject({
      name: this.form.value.name,
      id: this.subject.id,
      archived: this.form.value.archived
    });
    this.router.navigateByUrl('/');
  }

}
