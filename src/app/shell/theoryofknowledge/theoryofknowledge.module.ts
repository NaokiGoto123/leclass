import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheoryofknowledgeRoutingModule } from './theoryofknowledge-routing.module';
import { TheoryofknowledgeComponent } from './theoryofknowledge/theoryofknowledge.component';


@NgModule({
  declarations: [TheoryofknowledgeComponent],
  imports: [
    CommonModule,
    TheoryofknowledgeRoutingModule
  ]
})
export class TheoryofknowledgeModule { }
