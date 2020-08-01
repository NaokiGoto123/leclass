import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firebase_tools = require('firebase-tools');

// const db = admin.firestore();
const storage = admin.storage().bucket();

export const deleteLesson =
functions
.runWith({
  timeoutSeconds: 540,
  memory: '2GB',
})
.region('asia-northeast1')
.https.onCall(async (id, context) => {

  const pathToLesson = `lessons/${id}`

  await storage.deleteFiles({ directory: pathToLesson });

  await firebase_tools.firestore.delete(pathToLesson, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true,
    token: functions.config().fb.token,
  });
})
