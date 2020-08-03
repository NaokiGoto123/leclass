import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerscienceHlComponent } from './computerscience-hl/computerscience-hl.component';


const routes: Routes = [
  {
    path: '',
    component: ComputerscienceHlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputerscienceHlRoutingModule { }
