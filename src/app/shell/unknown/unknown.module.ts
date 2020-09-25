import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnknownRoutingModule } from './unknown-routing.module';
import { UnknownComponent } from './unknown/unknown.component';


@NgModule({
  declarations: [UnknownComponent],
  imports: [
    CommonModule,
    UnknownRoutingModule
  ]
})
export class UnknownModule { }
