import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firebase_tools = require('firebase-tools');

const db = admin.firestore();
const storage = admin.storage().bucket();

export const deleteLesson = functions
  .region('asia-northeast1')
  .https.onCall(async (id, context) => {
    const users = (await db.collection(`users`).get()).docs.map((doc) =>
      doc.data()
    );

    const deleteLessonFromUsers: Promise<any>[] = users.map((user) => {
      return db.doc(`users/${user.uid}/list/${id}`).delete();
    });
    await Promise.all(deleteLessonFromUsers);

    const pathToLesson = `lessons/${id}`;

    await storage.deleteFiles({ directory: pathToLesson });

    await firebase_tools.firestore.delete(pathToLesson, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token,
    });
  });
