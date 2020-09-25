import { Component, OnInit } from '@angular/core';
import { VerificationService } from 'src/app/services/verification.service';
import { User } from 'src/app/interfaces/user';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

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
    private authService: AuthService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Verification | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Verification' },
      { property: 'og:title', content: 'Verification' },
      { property: 'og:description', content: 'Verification'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);

    this.user = this.authService.user;
    this.verificationGetService.getVerificationRequests().pipe(take(1)).subscribe((requests: string[]) => {
      this.verificationRequests = requests;
    });
  }

  ngOnInit(): void {
  }

  sendVerificationRequest() {
    this.verificationService.sendVerificationRequests(this.authService.user.uid);
  }

  cancelRequest() {
    this.verificationService.cancelRequest(this.authService.user.uid);
  }

}
