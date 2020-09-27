import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user = this.authService.user;

  routerLinks = [
    {
      label: 'Profile',
      link: 'profile'
    }
  ];

  targetUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.activatedRoute.queryParamMap.pipe(
      take(1),
      switchMap((params) => {
        return this.userService.getUser(params.get('id'));
      }))
      .subscribe((targetUser: User) => {
        this.targetUser = targetUser;
      });
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
  }

}
