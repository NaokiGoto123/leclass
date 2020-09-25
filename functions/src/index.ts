import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

export * from './deleteLesson.function'
export * from './deleteList.function'
export * from './algolia/lesson.function'
export * from './render.function'
