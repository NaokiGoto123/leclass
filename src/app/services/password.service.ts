import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private db: AngularFirestore
  ) {}

  getPassword(): Observable<{password: string}> {
    return this.db.doc<{password: string}>('password/password').valueChanges();
  }
}
