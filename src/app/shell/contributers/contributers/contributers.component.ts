import { Component, OnInit } from '@angular/core';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { User } from 'src/app/interfaces/user';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contributers',
  templateUrl: './contributers.component.html',
  styleUrls: ['./contributers.component.scss'],
})
export class ContributersComponent implements OnInit {
  administrators: Observable<User[]>;

  teachers: Observable<User[]>;

  developers: Observable<User[]>;

  constructor(
    private verificationGetService: VerificationGetService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Suppoters | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Get to know about the supporters' },
      { property: 'og:title', content: 'Supporters' },
      {
        property: 'og:description',
        content: 'Get to know about the supporters',
      },
      { property: 'og:url', content: location.href },
      {
        property: 'og:image',
        content: 'https://leclass-prod.web.app/assets/images/leclass.jpg',
      },
    ]);

    this.administrators = this.verificationGetService.getAdministrators();

    this.teachers = this.verificationGetService.getTeachers();

    this.developers = this.verificationGetService.getDevelopers();
  }

  ngOnInit(): void {}
}
