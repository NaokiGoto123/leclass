import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhysicsHlComponent } from './physics-hl/physics-hl.component';


const routes: Routes = [
  {
    path: '',
    component: PhysicsHlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicsHlRoutingModule { }
