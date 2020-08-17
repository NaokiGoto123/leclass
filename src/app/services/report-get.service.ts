import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Report } from '../interfaces/report';

@Injectable({
  providedIn: 'root'
})
export class ReportGetService {

  constructor(
    private db: AngularFirestore
  ) { }

  getReport(id: string): Observable<Report> {
    return this.db.doc<Report>(`reports/${id}`).valueChanges();
  }

  getReports(): Observable<Report[]> {
    return this.db.collection<Report>(`reports`, (ref) => ref.orderBy('date')).valueChanges();
  }
}
