import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportGetService } from 'src/app/services/report-get.service';
import { Report } from 'src/app/interfaces/report';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {

  report: Report;

  reporter: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportGetService: ReportGetService,
    private userService: UserService,
    private reportService: ReportService
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.reportGetService.getReport(id).subscribe((report: Report) => {
        this.report = report;
        this.userService.getUser(report.reporterId).subscribe((reporter: User) => {
          this.reporter = reporter;
        });
      });
    });
  }

  ngOnInit(): void {
  }

  fixReport() {
    this.reportService.fixReport(this.report.id);
  }

  unfixReport() {
    this.reportService.unfixReport(this.report.id);
  }

}
