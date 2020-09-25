import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PurposeComponent } from './purpose/purpose.component';
import { UsageComponent } from './usage/usage.component';
import { SupportersComponent } from './supporters/supporters.component';

@NgModule({
  declarations: [AboutComponent, PurposeComponent, UsageComponent, SupportersComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatTabsModule
  ]
})
export class AboutModule { }
