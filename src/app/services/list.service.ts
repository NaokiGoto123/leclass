import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { Lesson } from '../interfaces/lesson';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private db: AngularFirestore
  ) { }

  addToList(uid: string, id: string) {
    this.db.doc(`users/${uid}/list/${id}`).set({id});
  }

  removeFromList(uid: string, id: string) {
    this.db.doc(`users/${uid}/list/${id}`).delete();
  }

  removeAll(uid: string) {

  }

  getListItemIds(uid: string): Observable<string[]> {
    return this.db.collection(`users/${uid}/list`).valueChanges()
    .pipe(
      map((listItems: {id: string}[]) => {
        if (listItems.length) {
          const result: string[] = [];
          listItems.map((listItem: {id: string}) => {
            result.push(listItem.id);
          });
          return result;
        } else {
          return [];
        }
      })
    );
  }

  getListItems(uid: string): Observable<Lesson[]> {
    return this.db.collection(`users/${uid}/list`).valueChanges()
    .pipe(
      switchMap((listItems: {id: string}[]) => {
        if (listItems.length) {
          const result: Observable<Lesson>[] = [];
          listItems.map((listItem: {id: string}) => {
            result.push(this.db.doc<Lesson>(`lessons/${listItem.id}`).valueChanges());
          });
          return combineLatest(result);
        } else {
          return of([]);
        }
      })
    );
  }
}
