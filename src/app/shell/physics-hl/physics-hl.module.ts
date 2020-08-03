import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicsHlRoutingModule } from './physics-hl-routing.module';
import { PhysicsHlComponent } from './physics-hl/physics-hl.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PhysicsHlComponent],
  imports: [
    CommonModule,
    PhysicsHlRoutingModule,
    SharedModule
  ]
})
export class PhysicsHlModule { }
