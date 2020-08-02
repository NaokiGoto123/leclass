import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisandapproachesHlRoutingModule } from './analysisandapproaches-hl-routing.module';
import { AnalysisandapproachesHlComponent } from './analysisandapproaches-hl/analysisandapproaches-hl.component';


@NgModule({
  declarations: [AnalysisandapproachesHlComponent],
  imports: [
    CommonModule,
    AnalysisandapproachesHlRoutingModule
  ]
})
export class AnalysisandapproachesHlModule { }
