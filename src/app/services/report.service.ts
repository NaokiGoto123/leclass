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
    this.db.doc(`reports/${id}`).set({
      id,
      reporterId: report.reporterId,
      title: report.title,
      date: now,
      message: report.message
    });
  }

  fixReport(id: string) {
    this.db.doc(`reports/${id}`).update({isSolved: true});
  }

  unfixReport(id: string) {
    this.db.doc(`reports/${id}`).update({isSolved: false});
  }
}
