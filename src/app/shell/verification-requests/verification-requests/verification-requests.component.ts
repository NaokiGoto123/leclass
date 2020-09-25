import { Component, OnInit } from '@angular/core';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { VerificationService } from 'src/app/services/verification.service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

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
