import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  index = {
    lessons_date: searchClient.initIndex('lessons_date'),
  };

  constructor() { }
}
