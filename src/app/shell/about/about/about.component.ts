import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  routerLinks = [
    { label: 'What is this service for?', link: 'purpose' },
    { label: 'How to use this service', link: 'usage' },
    { label: 'Contributers', link: 'supporters'}
  ];

  constructor(
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass | About');

    this.meta.addTags([
      { name: 'description', content: 'Get to know what leclass is' },
      { property: 'og:title', content: 'About' },
      { property: 'og:description', content: 'Get to know what leclass is'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);
  }

  ngOnInit(): void {
  }

}
