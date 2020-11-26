import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContributersComponent } from './contributers/contributers.component';

const routes: Routes = [
  {
    path: '',
    component: ContributersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContributersRoutingModule {}
