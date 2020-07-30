import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';


const routes: Routes = [
  {
    path: '',
    component: CreateLessonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateLessonRoutingModule { }
