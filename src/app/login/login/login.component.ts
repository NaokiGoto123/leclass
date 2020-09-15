import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { tap, map, take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;

  initialLoading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private rootDocument: HTMLDocument
  ) {
    if (!environment.production) {
      this.rootDocument
        .querySelector('[rel=icon]')
        .setAttribute('href', 'favicon.svg');
    }
    else if (environment.production) {
      this.rootDocument
        .querySelector('[rel=icon]')
        .setAttribute('href', 'favicon.prod.svg');
    }

    this.initialLoading = true;
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      take(1))
      .subscribe((user: User) => {
        this.user = user;
        this.initialLoading = false;
      }
      );
  }

  async login() {
    await this.authService.googleSignin();
    this.router.navigateByUrl('/');
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

}
