import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject/subject.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SubjectComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SubjectModule { }
