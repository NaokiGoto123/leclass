import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IbDpComponent } from './ib-dp/ib-dp.component';


const routes: Routes = [
  {
    path: '',
    component: IbDpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IbDpRoutingModule { }
