import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisandapproachesHlRoutingModule } from './analysisandapproaches-hl-routing.module';
import { AnalysisandapproachesHlComponent } from './analysisandapproaches-hl/analysisandapproaches-hl.component';
import { SharedModule } from '../shared/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AnalysisandapproachesHlComponent],
  imports: [
    CommonModule,
    AnalysisandapproachesHlRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class AnalysisandapproachesHlModule { }
