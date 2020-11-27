import { firestore } from 'firebase';

export interface Lesson {
  id: string;
  title: string;
  loomLink: string;
  content: string;
  createrId: string;
  date: firestore.Timestamp;
  subjectId: string;
  number: number;
  isPublic: boolean;
}
