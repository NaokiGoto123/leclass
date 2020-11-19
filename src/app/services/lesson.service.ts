import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lesson } from '../interfaces/lesson';
import { AngularFireFunctions } from '@angular/fire/functions';
import { firestore } from 'firebase';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(
    private db: AngularFirestore,
    private fns: AngularFireFunctions,
    private http: HttpClient
  ) { }

  createLesson(lesson: Omit<Lesson, 'date'>) {
    this.db.doc(`lessons/${lesson.id}`).set({
      ...lesson,
      date: firestore.Timestamp.now()
    });
  }

  updateLesson(lesson: Lesson) {
    this.db.doc<Lesson>(`lessons/${lesson.id}`).update(lesson);
  }

  async deleteLesson(id: string, videoId: string) {
    const deleteLesson = this.fns.httpsCallable('deleteLesson');
    const result = await deleteLesson(id).toPromise();
    const vimeoDeletion = await this.http.delete(`https://api.vimeo.com/videos/${videoId}`, {
      headers: new HttpHeaders({
        Authorization: `bearer 131de8827dca0fa95e1fadae192e3bf7`,
      }),
    }).toPromise();
  }
}
