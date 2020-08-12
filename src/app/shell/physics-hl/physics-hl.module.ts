import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicsHlRoutingModule } from './physics-hl-routing.module';
import { PhysicsHlComponent } from './physics-hl/physics-hl.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [PhysicsHlComponent],
  imports: [
    CommonModule,
    PhysicsHlRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class PhysicsHlModule { }
