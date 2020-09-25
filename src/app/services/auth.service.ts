import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
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
    const doc: User = await this.db.doc<User>(`users/${credential.user.uid}`).valueChanges().pipe(
      take(1)
    ).toPromise();
    if (doc) {
      this.router.navigateByUrl('/');
    } else {
      return this.updateUserData({
        ...credential.user,
        profile: `This is ${credential.user.displayName}'s profile.`,
        verified: false
      });
    }
  }

  private updateUserData(user: User) {
    const data = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      profile: user.profile,
      verified: user.verified
    };

    return this.db.doc(`users/${user.uid}`).set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigateByUrl('/login');
  }
}
