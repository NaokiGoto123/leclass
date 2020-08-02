import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EconomicsSlRoutingModule } from './economics-sl-routing.module';
import { EconomicsSlComponent } from './economics-sl/economics-sl.component';


@NgModule({
  declarations: [EconomicsSlComponent],
  imports: [
    CommonModule,
    EconomicsSlRoutingModule
  ]
})
export class EconomicsSlModule { }
