import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson/lesson.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [LessonComponent],
  imports: [
    CommonModule,
    LessonRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    QuillModule.forRoot()
  ]
})
export class LessonModule { }
