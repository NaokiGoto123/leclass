import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisandapproachesHlRoutingModule } from './analysisandapproaches-hl-routing.module';
import { AnalysisandapproachesHlComponent } from './analysisandapproaches-hl/analysisandapproaches-hl.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AnalysisandapproachesHlComponent],
  imports: [
    CommonModule,
    AnalysisandapproachesHlRoutingModule,
    SharedModule
  ]
})
export class AnalysisandapproachesHlModule { }
