import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((firebaseUser: firebase.User) => {
      if (firebaseUser) {
        this.db.doc<User>(`users/${firebaseUser.uid}`).valueChanges().subscribe((user: User) => {
          this.user = user;
        });
      } else {
        this.user = null;
        return;
      }
    });
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(firebaseUser: firebase.User) {
    this.db.doc(`users/${firebaseUser.uid}`).valueChanges().subscribe((user: User) => {
      if (user) {
        return;
      } else {
        const data = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        };
        return this.db.doc(`users/${firebaseUser.uid}`).set(data, { merge: true });
      }
    });
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigateByUrl('/login');
  }
}
