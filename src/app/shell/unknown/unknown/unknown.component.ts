import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.scss']
})
export class UnknownComponent implements OnInit {

  constructor(
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass | 404');

    this.meta.addTags([
      { name: 'description', content: '404' },
      { property: 'og:title', content: '404' },
      { property: 'og:description', content: '404'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);
  }

  ngOnInit(): void {
  }

}
