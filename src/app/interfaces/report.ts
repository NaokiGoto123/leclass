import { firestore } from 'firebase';

export interface Report {
  reporterId: string;
  date: firestore.Timestamp;
  message: string;
}
