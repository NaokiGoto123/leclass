import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  listItems: Lesson[];

  initialLoading: boolean;

  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private listService: ListService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('List | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'List' },
      { property: 'og:title', content: 'List' },
      { property: 'og:description', content: 'List'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);

    this.initialLoading = true;
    this.subscription = this.listService.getListItems(this.authService.user.uid).subscribe((listItems: Lesson[]) => {
      this.listItems = listItems;
      setTimeout(() => {
        this.initialLoading = false;
      }, 500);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeAll() {
    this.listService.removeAll(this.authService.user.uid);
  }

}
