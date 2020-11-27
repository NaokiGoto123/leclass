import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lesson } from '../interfaces/lesson';
import { AngularFireFunctions } from '@angular/fire/functions';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(
    private db: AngularFirestore,
    private fns: AngularFireFunctions
  ) {}

  createLesson(lesson: Omit<Lesson, 'id' | 'date'>) {
    const id = this.db.createId();
    this.db.doc(`lessons/${id}`).set({
      id,
      ...lesson,
      date: firestore.Timestamp.now(),
    });
  }

  updateLesson(lesson: Lesson) {
    this.db.doc<Lesson>(`lessons/${lesson.id}`).update(lesson);
  }

  async deleteLesson(id: string) {
    const deleteLesson = this.fns.httpsCallable('deleteLesson');
    const result = await deleteLesson(id).toPromise();
  }
}
