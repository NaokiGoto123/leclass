import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  index: SearchIndex = this.searchService.index.lessons_date;

  options = [];

  user: User;

  isShowing = true;

  valueControl: FormControl = new FormControl();

  verificationRequests: string[];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private verificationGetService: VerificationGetService,
    private router: Router,
    private searchService: SearchService
  ) {
    this.authService.user$.subscribe((user: User) => {
      this.user = user;
    });
    this.verificationGetService.getVerificationRequests().pipe(take(1)).subscribe((verificationRequests) => {
      this.verificationRequests = verificationRequests;
    });
    this.index
      .search('', {
        page: 0,
        hitsPerPage: 5,
        facetFilters: ['isPublic:true']
      })
      .then((result) => {
        this.options = result.hits;
      });
  }

  ngOnInit(): void {
    this.valueControl.valueChanges.subscribe((query) => {
      this.index.search(query, {
        page: 0,
        hitsPerPage: 5,
        facetFilters: ['isPublic:true']
      })
      .then((result) => {
        this.options = result.hits;
      });
    });
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  routeSearch(searchQuery) {
    this.valueControl.reset();
    this.router.navigate(['/'], {
      queryParams: {
        searchQuery: searchQuery || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  directSearch(id) {
    this.valueControl.reset();
    this.router.navigate(['/lesson'], {
      queryParams: {
        id
      }
    });
  }
}
