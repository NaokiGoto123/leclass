import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import { User } from '../interfaces/user';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VerificationGetService {
  constructor(private db: AngularFirestore) {}

  getAdministrators(): Observable<User[]> {
    return this.db
      .collection<User>(`users`, (ref) =>
        ref.where('isAdministrator', '==', true)
      )
      .valueChanges()
      .pipe(
        map((administrators: User[]) => {
          if (administrators.length) {
            return administrators;
          } else {
            return [];
          }
        })
      );
  }

  getTeachers(): Observable<User[]> {
    return this.db
      .collection<User>(`users`, (ref) => ref.where('isTeacher', '==', true))
      .valueChanges()
      .pipe(
        map((teachers: User[]) => {
          if (teachers.length) {
            return teachers;
          } else {
            return [];
          }
        })
      );
  }

  getDevelopers(): Observable<User[]> {
    return this.db
      .collection<User>(`users`, (ref) => ref.where('isDeveloper', '==', true))
      .valueChanges()
      .pipe(
        map((developers: User[]) => {
          if (developers.length) {
            return developers;
          } else {
            return [];
          }
        })
      );
  }
}
