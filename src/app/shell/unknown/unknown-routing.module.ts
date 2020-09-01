import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnknownComponent } from './unknown/unknown.component';


const routes: Routes = [
  {
    path: '',
    component: UnknownComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnknownRoutingModule { }
