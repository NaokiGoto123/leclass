import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportGetService } from 'src/app/services/report-get.service';
import { Report } from 'src/app/interfaces/report';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ReportService } from 'src/app/services/report.service';
import { switchMap, take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

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
    private reportService: ReportService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.activatedRoute.queryParamMap.pipe(
      take(1),
      switchMap((params) => {
        return this.reportGetService.getReport(params.get('id'));
      }),
      switchMap((report: Report) => {
        this.report = report;

        this.titleService.setTitle(`Leclass | ${report.title}`);

        this.meta.addTags([
          { name: 'description', content: `Report | ${report.title}` },
          { property: 'og:title', content: `Report | ${report.title}` },
          { property: 'og:description', content: `Report | ${report.title}` },
          { property: 'og:url', content: location.href },
          { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
        ]);

        return this.userService.getUser(report.reporterId);
      }))
      .subscribe((reporter: User) => {
        this.reporter = reporter;
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
