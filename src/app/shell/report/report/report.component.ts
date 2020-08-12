import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  form = this.fb.group({
    message: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
  }

  sendReport() {
    if (this.form.valid) {
      console.log(this.form.value.message);
      this.reportService.sendReport(this.authService.user.uid, this.form.value.message);
    } else {
      console.log('false');
    }
  }

}
