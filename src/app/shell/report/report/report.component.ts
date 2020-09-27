import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  titleMaxLength = 20;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(this.titleMaxLength)]],
    message: ['', Validators.required]
  });

  isComplete: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private reportService: ReportService,
    private router: Router,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Report | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Report' },
      { property: 'og:title', content: 'Report' },
      { property: 'og:description', content: 'Report'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
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

  get titleControl() {
    return this.form.get('title');
  }

  sendReport() {
    if (this.form.valid) {
      this.reportService.sendReport({
        reporterId: this.authService.user.uid,
        title: this.form.value.title,
        message: this.form.value.message,
        isSolved: false
      });
      this.isComplete = true;
      this.router.navigateByUrl('/');
    }
  }

}
