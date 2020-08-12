import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheoryofknowledgeRoutingModule } from './theoryofknowledge-routing.module';
import { TheoryofknowledgeComponent } from './theoryofknowledge/theoryofknowledge.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [TheoryofknowledgeComponent],
  imports: [
    CommonModule,
    TheoryofknowledgeRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class TheoryofknowledgeModule { }
