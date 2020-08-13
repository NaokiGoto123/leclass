import * as functions from 'firebase-functions';

const firebase_tools = require('firebase-tools');

export const deleteList =
functions
.runWith({
  timeoutSeconds: 540,
  memory: '2GB',
})
.region('asia-northeast1')
.https.onCall(async (uid, context) => {

  const pathToLesson = `users/${uid}/list`

  await firebase_tools.firestore.delete(pathToLesson, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true,
    token: functions.config().fb.token,
  });
})
