import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubjectGuard } from 'src/app/guards/add-subject.guard';
import { AddSubjectComponent } from './add-subject/add-subject.component';

const routes: Routes = [
  {
    path: '',
    component: AddSubjectComponent,
    canActivate: [AddSubjectGuard],
    canLoad: [AddSubjectGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSubjectRoutingModule {}
