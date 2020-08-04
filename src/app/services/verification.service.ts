import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(
    private db: AngularFirestore
  ) { }

  sendVerificationRequests(uid: string) {
    return this.db.doc(`verificationRequests/${uid}`).set({id: uid});
  }

  verifyUser(uid: string) {
    return this.db.doc(`users/${uid}`).update({verified: true});
  }
}
