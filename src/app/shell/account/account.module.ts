import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DraftsComponent } from './drafts/drafts.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AccountComponent, ProfileComponent, DraftsComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AccountModule { }
