import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lesson } from '../interfaces/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(
    private db: AngularFirestore
  ) { }

  createLesson(lesson: Lesson) {
    this.db.doc(`lessons/${lesson.id}`).set(lesson);
  }
}
