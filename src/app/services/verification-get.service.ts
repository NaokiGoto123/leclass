import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificationGetService {

  constructor(
    private db: AngularFirestore
  ) { }

  getVerifiedUsers(): Observable<User[]> {
    return this.db.collection<User>(`users`, (ref) => ref.where('verified', '==', true)).valueChanges()
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

  getVerificationRequests() {
    return this.db.collection(`verificationRequests`).valueChanges()
    .pipe(
      map((requests) => {
        if (requests.length) {
          return requests;
        } else {
          return [];
        }
      })
    );
  }
}
