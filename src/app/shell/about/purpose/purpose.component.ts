import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.scss']
})
export class PurposeComponent implements OnInit {

  constructor(
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass | Purpose');

    this.meta.addTags([
      { name: 'description', content: 'Get to know what leclass is' },
      { property: 'og:title', content: 'Purpose' },
      { property: 'og:description', content: 'Get to know what leclass is'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);
  }

  ngOnInit(): void {
  }

}
