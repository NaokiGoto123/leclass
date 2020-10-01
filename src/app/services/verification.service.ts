import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  constructor(private db: AngularFirestore) {}

  sendVerificationRequests(uid: string) {
    return this.db.doc(`verificationRequests/${uid}`).set({ id: uid });
  }

  verifyUser(uid: string) {
    this.db
      .doc(`users/${uid}`)
      .update({ verified: true })
      .then(() => {
        this.db.doc(`verificationRequests/${uid}`).delete();
      });
  }

  cancelRequest(uid: string) {
    this.db.doc(`verificationRequests/${uid}`).delete();
  }
}
