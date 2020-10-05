import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { ListService } from 'src/app/services/list.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.scss'],
})
export class LessonCardComponent implements OnInit {
  @Input() lesson: Lesson;

  creater: User;

  publishedDate: moment.Moment;

  listItemIds: Observable<string[]>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    if (typeof this.lesson.date === 'number') {
      this.publishedDate = moment(this.lesson?.date);
    } else {
      this.publishedDate = moment(this.lesson?.date.toDate());
    }
    this.userService
      .getUser(this.lesson?.createrId)
      .pipe(take(1))
      .subscribe((creater: User) => {
        this.creater = creater;
      });

    this.listItemIds = this.listService.getListItemIds(
      this.authService.user.uid
    );
  }

  addToList() {
    this.listService.addToList(this.authService.user.uid, this.lesson.id);
  }

  removeFromList() {
    this.listService.removeFromList(this.authService.user.uid, this.lesson.id);
  }
}
