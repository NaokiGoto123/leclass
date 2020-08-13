import { Algolia } from './algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const createLesson = functions
  .region('asia-northeast1')
  .firestore.document('lessons/{id}')
  .onCreate((snap) => {
    const data = snap.data();
    return algolia.saveRecord({
      indexName: 'lessons',
      largeConcentKey: 'body',
      data,
    });
  });

export const deleteLessonFromIndex = functions
  .region('asia-northeast1')
  .firestore.document('lessons/{id}')
  .onDelete((snap) => {
    const data = snap.data();

    if (data) {
      return algolia.removeRecord('lessons', data.id);
    } else {
      return;
    }
  });

export const updateLesson = functions
  .region('asia-northeast1')
  .firestore.document('lessons/{id}')
  .onUpdate((change) => {
    const data = change.after.data();
    return algolia.saveRecord({
      indexName: 'lessons',
      largeConcentKey: 'body',
      isUpdate: true,
      data,
    });
  });
