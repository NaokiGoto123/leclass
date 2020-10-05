import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LessonCardComponent } from './lesson-card/lesson-card.component';
import { CardsListComponent } from './cards-list/cards-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [LessonCardComponent, CardsListComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [LessonCardComponent, CardsListComponent],
})
export class SharedModule {}
