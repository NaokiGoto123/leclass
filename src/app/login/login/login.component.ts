import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user$: Observable<User>;

  initialLoading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.initialLoading = true;
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    setTimeout(() => {
      this.initialLoading = false;
    }, 1000);
  }

  async login() {
    await this.authService.googleSignin();
    this.router.navigateByUrl('/');
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

}
