import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivedCoursesRoutingModule } from './archived-courses-routing.module';
import { ArchivedCoursesComponent } from './archived-courses/archived-courses.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ArchivedCoursesComponent],
  imports: [
    CommonModule,
    ArchivedCoursesRoutingModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class ArchivedCoursesModule { }
