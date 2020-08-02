import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisandapproachesHlComponent } from './analysisandapproaches-hl/analysisandapproaches-hl.component';


const routes: Routes = [
  {
    path: '',
    component: AnalysisandapproachesHlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisandapproachesHlRoutingModule { }
