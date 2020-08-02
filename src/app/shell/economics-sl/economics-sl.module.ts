import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EconomicsSlRoutingModule } from './economics-sl-routing.module';
import { EconomicsSlComponent } from './economics-sl/economics-sl.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EconomicsSlComponent],
  imports: [
    CommonModule,
    EconomicsSlRoutingModule,
    SharedModule
  ]
})
export class EconomicsSlModule { }
