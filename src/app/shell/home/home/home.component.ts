import { Component, OnInit } from '@angular/core';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private index: SearchIndex = this.searchService.index.lessons_date;

  lessons: Lesson[];

  initialLoading: boolean;

  result: {
    nbHits: number;
    hits: any[];
  };

  query: string;

  constructor(
    private lessonGetService: LessonGetService,
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialLoading = true;
    this.lessonGetService.getLessons().subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
      setTimeout(() => {
        this.initialLoading = false;
      }, 500);
    });
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
        console.log(result);
        this.result = result;
        this.initialLoading = false;
      });
  }
}
