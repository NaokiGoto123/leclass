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

  async deleteLesson(id: string) {
    const deleteLesson = this.fns.httpsCallable('deleteLesson');
    const result = await deleteLesson(id).toPromise();
  }
}
