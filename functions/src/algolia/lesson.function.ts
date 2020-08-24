import { Algolia } from './algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

import { markEventTried, shouldEventRun } from '../util';

export const createLesson = functions
  .region('asia-northeast1')
  .firestore.document('lessons/{id}')
  .onCreate((snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId)
      .then(async (should: boolean) => {
        if (should) {
          const data = snap.data();
          await algolia.saveRecord({
            indexName: 'lessons',
            largeConcentKey: 'body',
            data,
          });
          return markEventTried(eventId);
        } else {
          return true;
        }
      });
  });

export const deleteLessonFromIndex = functions
  .region('asia-northeast1')
  .firestore.document('lessons/{id}')
  .onDelete((snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId)
      .then(async (should: boolean) => {
        if (should) {
          const data = snap.data();

          if (data) {
            await algolia.removeRecord('lessons', data.id);
          } else {
            return true;
          }
          return markEventTried(eventId);
        } else {
          return true;
        }
      });
  });

export const updateLesson = functions
  .region('asia-northeast1')
  .firestore.document('lessons/{id}')
  .onUpdate((change, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId)
      .then(async (should: boolean) => {
        if (should) {
          const data = change.after.data();
          await algolia.saveRecord({
            indexName: 'lessons',
            largeConcentKey: 'body',
            isUpdate: true,
            data,
          });
          return markEventTried(eventId);
        } else {
          return true;
        }
      });
  });
