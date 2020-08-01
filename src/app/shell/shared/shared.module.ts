import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LessonCardComponent } from './lesson-card/lesson-card.component';
import { CardsListComponent } from './cards-list/cards-list.component';


@NgModule({
  declarations: [LessonCardComponent, CardsListComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    LessonCardComponent,
    CardsListComponent
  ]
})
export class SharedModule { }
