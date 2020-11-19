import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  form = this.fb.group({
    name: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private router: Router,
    private titleService: Title,
    private meta: Meta,
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
    this.subjectService.addSubject({
      name: this.form.value.name
    });
    this.router.navigateByUrl('/');
  }

}
