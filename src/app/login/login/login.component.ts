import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { tap, map, take } from 'rxjs/operators';

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
    private router: Router
  ) {
    this.initialLoading = true;
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      take(1))
      .subscribe((user: User) => {
        if (user) {
          this.user = user;
          this.initialLoading = false;
        }
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
