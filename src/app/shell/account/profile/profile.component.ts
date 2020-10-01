import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { switchMap } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;

  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.meta.addTags([
      { name: 'description', content: 'Profile' },
      { property: 'og:title', content: 'Profile' },
      { property: 'og:description', content: 'Profile' },
      { property: 'og:url', content: location.href },
      {
        property: 'og:image',
        content: 'https://leclass-prod.web.app/assets/images/leclass.jpg',
      },
    ]);

    this.subscription = this.activatedRoute.queryParamMap
      .pipe(
        switchMap((params) => {
          return this.userService.getUser(params.get('id'));
        })
      )
      .subscribe((user: User) => {
        this.user = user;
        this.titleService.setTitle(`${user.displayName} | Leclass`);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
