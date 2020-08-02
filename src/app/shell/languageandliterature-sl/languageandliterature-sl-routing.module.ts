import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageandliteratureSlComponent } from './languageandliterature-sl/languageandliterature-sl.component';


const routes: Routes = [
  {
    path: '',
    component: LanguageandliteratureSlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageandliteratureSlRoutingModule { }
