import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private db: AngularFirestore
  ) { }

  sendReport(reporterId: string, message: string) {
    const now = new Date();
    console.log(now);
    this.db.doc(`reports/${now.getTime()}`).set({
      reporterId,
      date: now,
      message
    });
  }
}
