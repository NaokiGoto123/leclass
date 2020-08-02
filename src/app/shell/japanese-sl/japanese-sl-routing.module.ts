import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JapaneseSlComponent } from './japanese-sl/japanese-sl.component';


const routes: Routes = [
  {
    path: '',
    component: JapaneseSlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JapaneseSlRoutingModule { }
