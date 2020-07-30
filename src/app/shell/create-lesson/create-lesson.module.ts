import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateLessonRoutingModule } from './create-lesson-routing.module';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';


@NgModule({
  declarations: [CreateLessonComponent],
  imports: [
    CommonModule,
    CreateLessonRoutingModule
  ]
})
export class CreateLessonModule { }
