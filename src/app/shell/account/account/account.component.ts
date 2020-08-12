import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user = this.authService.user;

  routerLinks: {label: string, link: string}[];

  targetUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.userService.getUser(id).subscribe((targetUser: User) => {
        this.targetUser = targetUser;
        if (targetUser.uid === this.authService.user.uid) {
          this.routerLinks = [
            {
              label: 'Profile',
              link: 'profile'
            },
            {
              label: 'Drafts',
              link: 'drafts'
            }
          ];
        } else {
          this.routerLinks = [
            {
              label: 'Profile',
              link: 'profile'
            }
          ];
        }
      });
    });
  }

  ngOnInit(): void {
  }

}
