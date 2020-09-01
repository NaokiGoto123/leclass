import { Component, OnInit } from '@angular/core';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { VerificationService } from 'src/app/services/verification.service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-verification-requests',
  templateUrl: './verification-requests.component.html',
  styleUrls: ['./verification-requests.component.scss']
})
export class VerificationRequestsComponent implements OnInit {

  user: User = this.authService.user;

  requestingUsers: User[];

  initialLoading: boolean;

  constructor(
    private verificationGetService: VerificationGetService,
    private verificationService: VerificationService,
    private authService: AuthService
  ) {
    this.initialLoading = true;
    this.verificationGetService.getRequestingUsers().pipe(take(1)).subscribe((requestingUsers: User[]) => {
      this.requestingUsers = requestingUsers;
      setTimeout(() => {
        this.initialLoading = false;
      }, 500);
    });
  }

  ngOnInit(): void {
  }

  verifyUser(uid: string) {
    this.verificationService.verifyUser(uid);
  }

  cancelRequest(uid: string) {
    this.verificationService.cancelRequest(uid);
  }

}
