import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private index: SearchIndex = this.searchService.index.lessons_date;

  initialLoading: boolean;

  result: {
    nbHits: number;
    hits: any[];
  };

  query: string;

  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle('Leclass | Home');

    this.meta.addTags([
      { name: 'description', content: 'Home' },
      { property: 'og:title', content: 'Home' },
      { property: 'og:description', content: 'Home'},
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://leclass-prod.web.app/assets/images/leclass.jpg' }
    ]);

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.query = params.get('searchQuery') || '';
      this.search();
    });
  }

  ngOnInit(): void {
  }

  private search() {
    this.initialLoading = true;
    this.index
      .search(this.query, {
        facetFilters: `isPublic:true`
      })
      .then((result) => {
        this.result = result;
        this.initialLoading = false;
      });
  }
}
