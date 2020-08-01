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

  getLessons(): Observable<Lesson[]> {
    return this.db.collection<Lesson>(`lessons`).valueChanges();
  }
}
