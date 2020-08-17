import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Report } from '../interfaces/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private db: AngularFirestore
  ) { }

  sendReport(report: Omit<Report, 'id' | 'date'>) {
    const id = this.db.createId();
    const now = new Date();
    console.log(now);
    this.db.doc(`reports/${id}`).set({
      id,
      reporterId: report.reporterId,
      title: report.title,
      date: now,
      message: report.message
    });
  }
}
