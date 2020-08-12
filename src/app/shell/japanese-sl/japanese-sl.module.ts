import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JapaneseSlRoutingModule } from './japanese-sl-routing.module';
import { JapaneseSlComponent } from './japanese-sl/japanese-sl.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [JapaneseSlComponent],
  imports: [
    CommonModule,
    JapaneseSlRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class JapaneseSlModule { }
