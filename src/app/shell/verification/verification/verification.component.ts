import { Component, OnInit } from '@angular/core';
import { VerificationService } from 'src/app/services/verification.service';
import { User } from 'src/app/interfaces/user';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  user: User;

  verificationRequests: string[];

  constructor(
    private verificationService: VerificationService,
    private verificationGetService: VerificationGetService,
    private authService: AuthService
  ) {
    this.user = this.authService.user;
    this.verificationGetService.getVerificationRequests().subscribe((requests: string[]) => {
      this.verificationRequests = requests;
    });
  }

  ngOnInit(): void {
  }

  sendVerificationRequest() {
    this.verificationService.sendVerificationRequests(this.authService.user.uid);
  }

}
