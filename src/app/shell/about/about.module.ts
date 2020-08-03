import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PurposeComponent } from './purpose/purpose.component';
import { UsageComponent } from './usage/usage.component';

@NgModule({
  declarations: [AboutComponent, PurposeComponent, UsageComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatTabsModule
  ]
})
export class AboutModule { }
