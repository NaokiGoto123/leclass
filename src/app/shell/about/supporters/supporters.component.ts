import { Component, OnInit } from '@angular/core';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { User } from 'src/app/interfaces/user';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supporters',
  templateUrl: './supporters.component.html',
  styleUrls: ['./supporters.component.scss']
})
export class SupportersComponent implements OnInit {

  verifiedUsers: Observable<User[]>;

  constructor(
    private verificationGetService: VerificationGetService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Suppoters | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Get to know about the supporters' },
      { property: 'og:title', content: 'Supporters' },
      { property: 'og:description', content: 'Get to know about the supporters'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);

    this.verifiedUsers = this.verificationGetService.getVerifiedUsers();
  }

  ngOnInit(): void {
  }

}
