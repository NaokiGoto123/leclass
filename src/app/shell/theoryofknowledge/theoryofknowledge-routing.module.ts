import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TheoryofknowledgeComponent } from './theoryofknowledge/theoryofknowledge.component';


const routes: Routes = [
  {
    path: '',
    component: TheoryofknowledgeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheoryofknowledgeRoutingModule { }
