import { firestore } from 'firebase';

export interface Report {
  id: string;
  reporterId: string;
  title: string;
  date: firestore.Timestamp;
  message: string;
  isSolved: boolean;
}
