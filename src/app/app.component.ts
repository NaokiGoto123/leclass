import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    @Inject(DOCUMENT) private rootDocument: HTMLDocument
  ) {
    this.rootDocument
      .querySelector('[rel=icon]')
      .setAttribute('href', `favicon${environment.production ? '.prod' : ''}.svg`);
  }
}
