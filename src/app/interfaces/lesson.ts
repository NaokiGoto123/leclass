import { firestore } from 'firebase';

export interface Lesson {
  id: string;
  thumbnail: string;
  videoLink: string;
  content: string;
  createrId: string;
  date: firestore.Timestamp;
  subject: string;
  isPublic: boolean;
}
