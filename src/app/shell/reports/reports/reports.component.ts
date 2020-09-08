import { Component, OnInit } from '@angular/core';
import { ReportGetService } from 'src/app/services/report-get.service';
import { Report } from 'src/app/interfaces/report';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports: Report[];

  initialLoading: boolean;

  constructor(
    private reportGetService: ReportGetService
  ) {
    this.initialLoading = true;
    this.reportGetService.getReports().pipe(take(1)).subscribe((reports: Report[]) => {
      this.reports = reports;
      setTimeout(() => {
        this.initialLoading = false;
      }, 500);
    });
  }

  ngOnInit(): void {
  }

}
