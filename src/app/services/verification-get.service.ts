import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import { User } from '../interfaces/user';
import { map, switchMap } from 'rxjs/operators';

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

  getVerificationRequests(): Observable<string[]> {
    return this.db.collection(`verificationRequests`).valueChanges()
    .pipe(
      map((requests: {id: string}[]) => {
        if (requests.length) {
          const uids: string[] = [];
          requests.map((request: {id: string}) => {
            uids.push(request.id);
          });
          return uids;
        } else {
          return [];
        }
      })
    );
  }

  getRequestingUsers(): Observable<User[]> {
    return this.db.collection(`verificationRequests`).valueChanges()
    .pipe(
      map((requests: {id: string}[]) => {
        if (requests.length) {
          const uids: string[] = [];
          requests.map((request: {id: string}) => {
            uids.push(request.id);
          });
          return uids;
        } else {
          return [];
        }
      }),
      switchMap((uids: string[]) => {
        if (uids.length) {
          const requestingUsers: Observable<User>[] = [];
          uids.map((uid: string) => {
            requestingUsers.push(this.db.doc<User>(`users/${uid}`).valueChanges());
          });
          return combineLatest(requestingUsers);
        } else {
          return of([]);
        }
      })
    );
  }
}
