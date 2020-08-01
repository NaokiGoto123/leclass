import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  lesson: Lesson;

  creater: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private lessonGetService: LessonGetService,
    private userService: UserService
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.lessonGetService.getLesson(id).subscribe((lesson: Lesson) => {
        this.lesson = lesson;
        this.userService.getUser(lesson.createrId).subscribe((creater: User) => {
          this.creater = creater;
        });
      });
    });
  }

  ngOnInit(): void {
  }

  navigateBack() {
    this.location.back();
  }

}
