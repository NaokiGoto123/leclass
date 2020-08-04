import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRequestsRoutingModule } from './verification-requests-routing.module';
import { VerificationRequestsComponent } from './verification-requests/verification-requests.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [VerificationRequestsComponent],
  imports: [
    CommonModule,
    VerificationRequestsRoutingModule,
    MatButtonModule
  ]
})
export class VerificationRequestsModule { }
