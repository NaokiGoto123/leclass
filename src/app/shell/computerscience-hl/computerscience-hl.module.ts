import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputerscienceHlRoutingModule } from './computerscience-hl-routing.module';
import { ComputerscienceHlComponent } from './computerscience-hl/computerscience-hl.component';


@NgModule({
  declarations: [ComputerscienceHlComponent],
  imports: [
    CommonModule,
    ComputerscienceHlRoutingModule
  ]
})
export class ComputerscienceHlModule { }
