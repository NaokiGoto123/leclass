import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listItems: Lesson[];

  initialLoading: boolean;

  constructor(
    private authService: AuthService,
    private listService: ListService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass | List');

    this.meta.addTags([
      { name: 'description', content: 'List' },
      { property: 'og:title', content: 'List' },
      { property: 'og:description', content: 'List'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);

    this.initialLoading = true;
    this.listService.getListItems(this.authService.user.uid).pipe(take(1)).subscribe((listItems) => {
      this.listItems = listItems;
      setTimeout(() => {
        this.initialLoading = false;
      }, 500);
    });
  }

  ngOnInit(): void {
  }

  removeAll() {
    this.listService.removeAll(this.authService.user.uid)
  }

}
