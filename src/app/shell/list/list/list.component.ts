import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';
import { Lesson } from 'src/app/interfaces/lesson';

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
    private listService: ListService
  ) {
    this.initialLoading = true;
    this.listService.getListItems(this.authService.user.uid).subscribe((listItems) => {
      console.log(listItems);
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
