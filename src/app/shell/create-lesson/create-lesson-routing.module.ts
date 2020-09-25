import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { LessonEditorGuard } from 'src/app/guards/lesson-editor.guard';
import { EnterLessonEditorGuard } from 'src/app/guards/enter-lesson-editor.guard';


const routes: Routes = [
  {
    path: '',
    component: CreateLessonComponent,
    canDeactivate: [LessonEditorGuard],
    canActivate: [EnterLessonEditorGuard],
    canLoad: [EnterLessonEditorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateLessonRoutingModule { }
