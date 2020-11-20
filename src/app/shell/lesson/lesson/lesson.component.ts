import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';
import { switchMap, take, map } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit, OnDestroy {
  user = this.authService.user;

  lesson: Lesson;

  embededLink: SafeResourceUrl;

  creater: User;

  listItemIds: string[];

  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    public locationService: Location,
    private lessonGetService: LessonGetService,
    private userService: UserService,
    private authService: AuthService,
    private listService: ListService,
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) {
    this.activatedRoute.queryParamMap
      .pipe(
        take(1),
        switchMap((params) => {
          return this.lessonGetService.getLesson(params.get('id'));
        }),
        map((lesson: Lesson) => {
          if (!lesson) {
            this.router.navigateByUrl('404');
          }
          this.lesson = lesson;
          this.embededLink = this.domSanitizer.bypassSecurityTrustResourceUrl(
            'https://www.loom.com/embed/' +
              lesson?.loomLink.match('(?<=share/).*$')[0]
          );
          this.userService
            .getUser(lesson.createrId)
            .subscribe((creater: User) => {
              this.creater = creater;
            });
          return lesson;
        })
      )
      .subscribe((lesson: Lesson) => {
        this.titleService.setTitle(`${lesson.title} | Leclass`);

        this.meta.addTags([
          { name: 'description', content: `${lesson.title}` },
          { property: 'og:title', content: `${lesson.title}` },
          { property: 'og:description', content: `${lesson.title}` },
          { property: 'og:url', content: location.href },
          {
            property: 'og:image',
            content: 'https://leclass-prod.web.app/assets/images/leclass.jpg',
          },
        ]);
      });

    this.subscription = this.listService
      .getListItemIds(this.authService.user.uid)
      .subscribe((listItemIds: string[]) => {
        this.listItemIds = listItemIds;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToList() {
    this.listService.addToList(this.authService.user.uid, this.lesson.id);
  }

  removeFromList() {
    this.listService.removeFromList(this.authService.user.uid, this.lesson.id);
  }
}
