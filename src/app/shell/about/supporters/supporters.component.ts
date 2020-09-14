import { Component, OnInit } from '@angular/core';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { User } from 'src/app/interfaces/user';
import { take } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-supporters',
  templateUrl: './supporters.component.html',
  styleUrls: ['./supporters.component.scss']
})
export class SupportersComponent implements OnInit {

  verifiedUsers: User[];

  constructor(
    private verificationGetService: VerificationGetService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Get to know about the supporters' },
      { property: 'og:title', content: 'Supporters' },
      { property: 'og:description', content: 'Get to know about the supporters'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);

    this.verificationGetService.getVerifiedUsers().pipe(take(1)).subscribe((verifiedUsers: User[]) => {
      this.verifiedUsers = verifiedUsers;
    });
  }

  ngOnInit(): void {
  }

}
