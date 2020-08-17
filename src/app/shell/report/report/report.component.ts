import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  form = this.fb.group({
    title: ['', Validators.required],
    message: ['', Validators.required]
  });

  isComplete: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private reportService: ReportService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = 'Your work will be lost. Is it okay?';
    }
  }

  sendReport() {
    if (this.form.valid) {
      console.log(this.form.value.message);
      this.reportService.sendReport({
        reporterId: this.authService.user.uid,
        title: this.form.value.title,
        message: this.form.value.message
      });
    } else {
      console.log('false');
    }
    this.isComplete = true;
    this.router.navigateByUrl('/');
  }

}
