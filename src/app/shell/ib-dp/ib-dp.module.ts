import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IbDpRoutingModule } from './ib-dp-routing.module';
import { IbDpComponent } from './ib-dp/ib-dp.component';


@NgModule({
  declarations: [IbDpComponent],
  imports: [
    CommonModule,
    IbDpRoutingModule
  ]
})
export class IbDpModule { }
