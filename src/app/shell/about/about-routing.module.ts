import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PurposeComponent } from './purpose/purpose.component';
import { UsageComponent } from './usage/usage.component';


const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'purpose'
      },
      {
        path: 'purpose',
        component: PurposeComponent
      },
      {
        path: 'usage',
        component: UsageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
