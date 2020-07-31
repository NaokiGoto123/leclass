import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateLessonRoutingModule } from './create-lesson-routing.module';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [CreateLessonComponent],
  imports: [
    CommonModule,
    CreateLessonRoutingModule,
    FroalaEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class CreateLessonModule { }
