import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from 'src/app/interfaces/lesson';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import * as moment from 'moment';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.scss']
})
export class LessonCardComponent implements OnInit {

  @Input() lesson: Lesson;

  creater: User;

  publishedDate: moment.Moment = moment(this.lesson?.date);

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.lesson?.createrId).subscribe((creater: User) => {
      this.creater = creater;
    });
  }

}
