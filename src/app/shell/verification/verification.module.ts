import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification/verification.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [VerificationComponent],
  imports: [
    CommonModule,
    VerificationRoutingModule,
    MatButtonModule
  ]
})
export class VerificationModule { }
