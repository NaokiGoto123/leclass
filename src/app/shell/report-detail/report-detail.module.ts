import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDetailRoutingModule } from './report-detail-routing.module';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [ReportDetailComponent],
  imports: [
    CommonModule,
    ReportDetailRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class ReportDetailModule { }
