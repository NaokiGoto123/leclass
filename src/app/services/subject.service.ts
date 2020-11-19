import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subject } from '../interfaces/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private db: AngularFirestore
  ) { }

  addSubject(subject: Omit<Subject, 'id' | 'archived'>) {
    const id = this.db.createId();
    this.db.doc(`subjects/${id}`).set({
      name: subject.name,
      id,
      archived: false
    });
  }

  updateSubject(subject: Subject) {
    this.db.doc(`subjects/${subject.id}`).set({
      name: subject.name,
      id: subject.id,
      archived: subject.archived
    });
  }

  getSubject(id: string): Observable<Subject> {
    return this.db.doc<Subject>(`subjects/${id}`).valueChanges();
  }

  getSubjects(): Observable<Subject[]> {
    return this.db.collection<Subject>(`subjects`).valueChanges();
  }
}
