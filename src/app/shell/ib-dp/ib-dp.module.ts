import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IbDpRoutingModule } from './ib-dp-routing.module';
import { IbDpComponent } from './ib-dp/ib-dp.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [IbDpComponent],
  imports: [
    CommonModule,
    IbDpRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class IbDpModule { }
