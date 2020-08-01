import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lesson } from '../interfaces/lesson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonGetService {

  constructor(
    private db: AngularFirestore
  ) { }

  getLesson(id: string): Observable<Lesson> {
    return this.db.doc<Lesson>(`lessons/${id}`).valueChanges();
  }

  getLessons(): Observable<Lesson[]> {
    return this.db.collection<Lesson>(`lessons`).valueChanges();
  }
}
