import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JapaneseSlRoutingModule } from './japanese-sl-routing.module';
import { JapaneseSlComponent } from './japanese-sl/japanese-sl.component';


@NgModule({
  declarations: [JapaneseSlComponent],
  imports: [
    CommonModule,
    JapaneseSlRoutingModule
  ]
})
export class JapaneseSlModule { }
