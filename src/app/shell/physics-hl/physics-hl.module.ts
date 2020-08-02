import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicsHlRoutingModule } from './physics-hl-routing.module';
import { PhysicsHlComponent } from './physics-hl/physics-hl.component';


@NgModule({
  declarations: [PhysicsHlComponent],
  imports: [
    CommonModule,
    PhysicsHlRoutingModule
  ]
})
export class PhysicsHlModule { }
