import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;

  initialLoading: boolean;

  enteredPassword = new FormControl();

  correctPassword: string;

  locked = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private passwordService: PasswordService
  ) {
    this.initialLoading = true;
    this.passwordService.getPassword().pipe(take(1)).subscribe((password: {password: string}) => {
      this.correctPassword = password.password;
    });
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

  checkPass() {
    if (this.enteredPassword.value === this.correctPassword) {
      this.locked = false;
      this.snackBar.open('The password is correct', null, {
        duration: 1500,
      });
    }
    else {
      this.enteredPassword.reset();
      this.snackBar.open('The password is incorrect', null, {
        duration: 1500,
        panelClass: ['warn']
      });
    }
  }

}
