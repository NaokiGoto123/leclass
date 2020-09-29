import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsGuard } from 'src/app/guards/reports.guard';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    canActivate: [ReportsGuard],
    canLoad: [ReportsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
