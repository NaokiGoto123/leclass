import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject/subject.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [SubjectComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class SubjectModule { }
