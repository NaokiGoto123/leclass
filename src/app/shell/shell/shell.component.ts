import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { DOCUMENT } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Subject } from 'src/app/interfaces/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  index: SearchIndex = this.searchService.index.lessons_date;

  options = [];

  user: User;

  isShowing = true;

  valueControl: FormControl = new FormControl();

  verificationRequests: string[];

  subjects: Observable<Subject[]>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private verificationGetService: VerificationGetService,
    private subjectService: SubjectService,
    private router: Router,
    private searchService: SearchService,
    @Inject(DOCUMENT) private rootDocument: HTMLDocument
  ) {
    this.authService.user$.subscribe((user: User) => {
      this.user = user;
    });

    this.subjects = this.subjectService.getSubjects();

    this.index
      .search('', {
        page: 0,
        hitsPerPage: 5,
        facetFilters: ['isPublic:true'],
      })
      .then((result) => {
        this.options = result.hits;
      });
  }

  ngOnInit(): void {
    this.valueControl.valueChanges.subscribe((query) => {
      this.index
        .search(query, {
          page: 0,
          hitsPerPage: 5,
          facetFilters: ['isPublic:true'],
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
        id,
      },
    });
  }
}
