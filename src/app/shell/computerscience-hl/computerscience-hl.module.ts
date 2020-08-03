import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputerscienceHlRoutingModule } from './computerscience-hl-routing.module';
import { ComputerscienceHlComponent } from './computerscience-hl/computerscience-hl.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ComputerscienceHlComponent],
  imports: [
    CommonModule,
    ComputerscienceHlRoutingModule,
    SharedModule
  ]
})
export class ComputerscienceHlModule { }
