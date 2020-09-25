import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFirestore
  ) { }

  getUser(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  updateUser(user: Omit<User, 'email' | 'verified'>) {
    return this.db.doc(`users/${user.uid}`).set(user, { merge: true });
  }
}
