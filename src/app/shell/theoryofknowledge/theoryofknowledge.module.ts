import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheoryofknowledgeRoutingModule } from './theoryofknowledge-routing.module';
import { TheoryofknowledgeComponent } from './theoryofknowledge/theoryofknowledge.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TheoryofknowledgeComponent],
  imports: [
    CommonModule,
    TheoryofknowledgeRoutingModule,
    SharedModule
  ]
})
export class TheoryofknowledgeModule { }
