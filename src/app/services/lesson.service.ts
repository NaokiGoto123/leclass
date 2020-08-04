import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lesson } from '../interfaces/lesson';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(
    private db: AngularFirestore,
    private fns: AngularFireFunctions
  ) { }

  createLesson(lesson: Lesson) {
    this.db.doc(`lessons/${lesson.id}`).set(lesson);
  }

  updateLesson(lesson: Omit<Lesson, 'createrId' | 'date' | 'thumbnail' | 'videoLink'>) {
    this.db.doc(`lessons/${lesson.id}`).set(lesson, {merge: true});
  }

  async deleteLesson(id: string) {
    const deleteLesson = this.fns.httpsCallable('deleteLesson');
    const result = await deleteLesson(id).toPromise();
  }
}
