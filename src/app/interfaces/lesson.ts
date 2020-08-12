import { firestore } from 'firebase';
import { SafeResourceUrl } from '@angular/platform-browser';

export interface Lesson {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  playerUrl: string;
  content: string;
  createrId: string;
  date: firestore.Timestamp;
  subject: string;
  isPublic: boolean;
}
