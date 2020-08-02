import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageandliteratureSlRoutingModule } from './languageandliterature-sl-routing.module';
import { LanguageandliteratureSlComponent } from './languageandliterature-sl/languageandliterature-sl.component';


@NgModule({
  declarations: [LanguageandliteratureSlComponent],
  imports: [
    CommonModule,
    LanguageandliteratureSlRoutingModule
  ]
})
export class LanguageandliteratureSlModule { }
