import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributersRoutingModule } from './contributers-routing.module';
import { ContributersComponent } from './contributers/contributers.component';

@NgModule({
  declarations: [ContributersComponent],
  imports: [CommonModule, ContributersRoutingModule],
})
export class ContributersModule {}
