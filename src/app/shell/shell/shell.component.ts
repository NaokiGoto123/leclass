import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { VerificationGetService } from 'src/app/services/verification-get.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  user: User = this.authService.user;

  isShowing = true;

  valueControl: FormControl = new FormControl();

  form = this.fb.group({
    course: ['DP', [Validators.required]]
  });

  verificationRequests: string[];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private verificationGetService: VerificationGetService
  ) {
    this.verificationGetService.getVerificationRequests().subscribe((verificationRequests) => {
      this.verificationRequests = verificationRequests;
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((result) => {
      console.log(result.course);
    });
    this.valueControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

}
