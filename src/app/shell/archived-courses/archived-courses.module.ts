import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivedCoursesRoutingModule } from './archived-courses-routing.module';
import { ArchivedCoursesComponent } from './archived-courses/archived-courses.component';


@NgModule({
  declarations: [ArchivedCoursesComponent],
  imports: [
    CommonModule,
    ArchivedCoursesRoutingModule
  ]
})
export class ArchivedCoursesModule { }
