import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lesson } from '../interfaces/lesson';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LessonGetService {

  constructor(
    private db: AngularFirestore
  ) { }

  getLesson(id: string): Observable<Lesson> {
    return this.db.doc<Lesson>(`lessons/${id}`).valueChanges()
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
    return this.db.collection<Lesson>(`lessons`).valueChanges()
    .pipe(
      map((lessons: Lesson[]) => {
        if (lessons.length) {
          return lessons;
        } else {
          return [];
        }
      })
    );;
  }

  getSpecificLessons(subject: string): Observable<Lesson[]> {
    return this.db.collection<Lesson>(`lessons`, (ref) => ref.where('subject', '==', subject)).valueChanges()
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
}
