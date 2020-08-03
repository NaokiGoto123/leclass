import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { DraftsComponent } from './drafts/drafts.component';


const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'drafts',
        component: DraftsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
