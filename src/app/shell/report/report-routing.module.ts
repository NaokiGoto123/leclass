import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { ReportGuard } from 'src/app/guards/report.guard';


const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    canDeactivate: [ReportGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
