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

  getVerifiedUsers(): Observable<User[]> {
    return this.db
      .collection<User>(`users`, (ref) => ref.where('isTeacher', '==', true))
      .valueChanges()
      .pipe(
        map((verifiedUsers: User[]) => {
          if (verifiedUsers.length) {
            return verifiedUsers;
          } else {
            return [];
          }
        })
      );
  }
}
