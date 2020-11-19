import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivedCoursesComponent } from './archived-courses/archived-courses.component';


const routes: Routes = [
  {
    path: '',
    component: ArchivedCoursesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivedCoursesRoutingModule { }
