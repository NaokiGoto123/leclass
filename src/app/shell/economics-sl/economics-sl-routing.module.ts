import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EconomicsSlComponent } from './economics-sl/economics-sl.component';


const routes: Routes = [
  {
    path: '',
    component: EconomicsSlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EconomicsSlRoutingModule { }
