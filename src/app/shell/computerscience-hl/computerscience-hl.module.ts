import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputerscienceHlRoutingModule } from './computerscience-hl-routing.module';
import { ComputerscienceHlComponent } from './computerscience-hl/computerscience-hl.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [ComputerscienceHlComponent],
  imports: [
    CommonModule,
    ComputerscienceHlRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class ComputerscienceHlModule { }
