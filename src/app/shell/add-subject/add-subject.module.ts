import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSubjectRoutingModule } from './add-subject-routing.module';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddSubjectComponent],
  imports: [
    CommonModule,
    AddSubjectRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddSubjectModule { }
