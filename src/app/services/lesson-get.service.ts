import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lesson } from '../interfaces/lesson';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LessonGetService {
  constructor(private db: AngularFirestore) {}

  getLesson(id: string): Observable<Lesson> {
    return this.db
      .doc<Lesson>(`lessons/${id}`)
      .valueChanges()
      .pipe(
        map((lesson: Lesson) => {
          if (lesson) {
            return lesson;
          } else {
            return null;
          }
        })
      );
  }

  getLessons(): Observable<Lesson[]> {
    return this.db
      .collection<Lesson>(`lessons`, (ref) => ref.where('isPublic', '==', true))
      .valueChanges()
      .pipe(
        map((lessons: Lesson[]) => {
          if (lessons.length) {
            return lessons;
          } else {
            return [];
          }
        })
      );
  }

  getSpecificLessons(subjectId: string): Observable<Lesson[]> {
    return this.db
      .collection<Lesson>(`lessons`, (ref) =>
        ref
          .where('subjectId', '==', subjectId)
          .where('isPublic', '==', true)
          .orderBy('number')
      )
      .valueChanges()
      .pipe(
        map((lessons: Lesson[]) => {
          if (lessons.length) {
            return lessons;
          } else {
            return [];
          }
        })
      );
  }

  getUnpublishedLessons(uid: string): Observable<Lesson[]> {
    return this.db
      .collection(`lessons`, (ref) =>
        ref.where('isPublic', '==', false).where('createrId', '==', uid)
      )
      .valueChanges()
      .pipe(
        map((unpublishedLessons: Lesson[]) => {
          if (unpublishedLessons.length) {
            return unpublishedLessons;
          } else {
            return [];
          }
        })
      );
  }
}
