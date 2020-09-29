import { Component, OnDestroy, OnInit } from '@angular/core';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { VerificationService } from 'src/app/services/verification.service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verification-requests',
  templateUrl: './verification-requests.component.html',
  styleUrls: ['./verification-requests.component.scss']
})
export class VerificationRequestsComponent implements OnInit, OnDestroy {

  user: User = this.authService.user;

  requestingUsers: User[];

  initialLoading: boolean;

  subscription: Subscription;

  constructor(
    private verificationGetService: VerificationGetService,
    private verificationService: VerificationService,
    private authService: AuthService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Verification requests | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Verification requests' },
      { property: 'og:title', content: 'Verification requests' },
      { property: 'og:description', content: 'Verification requests'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);

    this.initialLoading = true;
    this.subscription = this.verificationGetService.getRequestingUsers().subscribe((requestingUsers: User[]) => {
      this.requestingUsers = requestingUsers;
      setTimeout(() => {
        this.initialLoading = false;
      }, 500);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  verifyUser(uid: string) {
    this.verificationService.verifyUser(uid);
  }

  cancelRequest(uid: string) {
    this.verificationService.cancelRequest(uid);
  }

}
