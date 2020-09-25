import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationRequestsComponent } from './verification-requests/verification-requests.component';
import { VerificationRequestsGuard } from 'src/app/guards/verification-requests.guard';


const routes: Routes = [
  {
    path: '',
    component: VerificationRequestsComponent,
    canActivate: [VerificationRequestsGuard],
    canLoad: [VerificationRequestsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRequestsRoutingModule { }
