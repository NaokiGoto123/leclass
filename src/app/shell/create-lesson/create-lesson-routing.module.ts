import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { LessonEditorGuard } from 'src/app/guards/lesson-editor.guard';


const routes: Routes = [
  {
    path: '',
    component: CreateLessonComponent,
    canDeactivate: [LessonEditorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateLessonRoutingModule { }
