import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  user = this.authService.user;

  lesson: Lesson;

  safeHtml: SafeHtml;

  safePlayerUrl: SafeResourceUrl;

  creater: User;

  listItemIds: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private lessonGetService: LessonGetService,
    private userService: UserService,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private listService: ListService
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.lessonGetService.getLesson(id).subscribe((lesson: Lesson) => {
        this.lesson = lesson;
        this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(lesson.content);
        console.log(lesson.playerUrl);
        this.safePlayerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(lesson.playerUrl);
        this.userService.getUser(lesson.createrId).subscribe((creater: User) => {
          this.creater = creater;
        });
      });
    });
    this.listService.getListItemIds(this.authService.user.uid).subscribe((listItemIds: string[]) => {
      this.listItemIds = listItemIds;
    });
  }

  ngOnInit(): void {
  }

  navigateBack() {
    this.location.back();
  }

  addToList() {
    this.listService.addToList(this.authService.user.uid, this.lesson.id);
  }

  removeFromList() {
    this.listService.removeFromList(this.authService.user.uid, this.lesson.id);
  }

}
