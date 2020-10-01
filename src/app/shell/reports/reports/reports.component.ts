import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReportGetService } from 'src/app/services/report-get.service';
import { Report } from 'src/app/interfaces/report';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  reports: Report[];

  initialLoading: boolean;

  subscription: Subscription;

  constructor(
    private reportGetService: ReportGetService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Reports | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Reports' },
      { property: 'og:title', content: 'Reports' },
      { property: 'og:description', content: 'Reports' },
      { property: 'og:url', content: location.href },
      {
        property: 'og:image',
        content: 'https://leclass-prod.web.app/assets/images/leclass.jpg',
      },
    ]);

    this.initialLoading = true;
    this.subscription = this.reportGetService
      .getReports()
      .subscribe((reports: Report[]) => {
        this.reports = reports;
        setTimeout(() => {
          this.initialLoading = false;
        }, 500);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
