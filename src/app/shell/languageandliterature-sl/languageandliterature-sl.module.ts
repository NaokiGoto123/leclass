import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageandliteratureSlRoutingModule } from './languageandliterature-sl-routing.module';
import { LanguageandliteratureSlComponent } from './languageandliterature-sl/languageandliterature-sl.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LanguageandliteratureSlComponent],
  imports: [
    CommonModule,
    LanguageandliteratureSlRoutingModule,
    SharedModule
  ]
})
export class LanguageandliteratureSlModule { }
