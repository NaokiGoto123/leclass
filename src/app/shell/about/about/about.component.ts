import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
