import { Component, OnInit } from '@angular/core';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { VerificationService } from 'src/app/services/verification.service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification-requests',
  templateUrl: './verification-requests.component.html',
  styleUrls: ['./verification-requests.component.scss']
})
export class VerificationRequestsComponent implements OnInit {

  user: User = this.authService.user;

  requestingUsers: User[];

  constructor(
    private verificationGetService: VerificationGetService,
    private verificationService: VerificationService,
    private authService: AuthService
  ) {
    this.verificationGetService.getRequestingUsers().subscribe((requestingUsers: User[]) => {
      this.requestingUsers = requestingUsers;
      console.log(requestingUsers);
    });
  }

  ngOnInit(): void {
  }

  verifyUser(uid: string) {
    console.log('bb');
    this.verificationService.verifyUser(uid);
  }

  cancelRequest(uid: string) {
    console.log('aa');
    this.verificationService.cancelRequest(uid);
  }

}
