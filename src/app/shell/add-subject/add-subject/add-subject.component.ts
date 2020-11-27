import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { switchMap, take } from 'rxjs/operators';
import { Subject } from 'src/app/interfaces/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit {
  id = this.db.createId();

  subject: Subject;

  form = this.fb.group({
    name: ['', [Validators.required]],
    responsibleEmail: ['', [Validators.required]],
    curriculum: ['', [Validators.required]],
    archived: [false],
  });

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    public locationService: Location,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private snackBar: MatSnackBar
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
        if (subject) {
          this.subject = subject;
          this.form.patchValue(subject);
        }
      });
  }

  ngOnInit(): void {}

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = 'Your work will be lost. Is it okay?';
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  private async upload(base64: string): Promise<string> {
    const time: number = new Date().getTime();
    const ref = this.storage.ref(`subjects/${this.id}/${time}`);
    const result = await ref.putString(base64, 'data_url');
    return result.ref.getDownloadURL();
  }

  private async addSubject() {
    const photoURL = await this.upload(this.croppedImage);
    this.subjectService.addSubject({
      id: this.id,
      name: this.form.value.name,
      responsibleEmail: this.form.value.responsibleEmail,
      curriculum: this.form.value.curriculum,
      photoURL,
    });
  }

  private updateSubject() {
    this.subjectService.updateSubject({
      id: this.subject.id,
      name: this.form.value.name,
      responsibleEmail: this.form.value.responsibleEmail,
      curriculum: this.form.value.curriculum,
      archived: this.form.value.archived,
    });
  }

  async submit() {
    this.snackBar.open('Saving in progress', null, {
      duration: 10000000,
    });
    this.router.navigateByUrl('/');
    if (this.subject) {
      await this.updateSubject();
    } else {
      await this.addSubject();
    }
    this.snackBar.open('Successfully saved!');
  }
}
