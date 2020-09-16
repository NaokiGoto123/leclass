import * as functions from 'firebase-functions';
import * as express from 'express';
import * as useragent from 'express-useragent';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as admin from 'firebase-admin';

const db = admin.firestore();

const file = readFileSync(resolve(__dirname, 'index.html'), {
  encoding: 'utf-8',
});

const replacer = (data: string) => {
  return (match: string, content: string): string => {
    return match.replace(content, data);
  };
};

const buildHtml = (lesson: { [key: string]: string }) => {
  return file
    .replace(
      /<meta name="description" content="(.+)" \/>/gm,
      replacer(lesson.body?.substr(0, 200))
    )
    .replace(/content="(.+ogp-cover.png)"/gm, replacer(lesson.thumbnail))

    .replace(/<title>(.+)<\/title>"/gm, replacer(lesson.title))

    .replace(
      /<meta property="og:title" content="(.+)" \/>"/gm,
      replacer(lesson.title)
    )
};

const app = express();
app.use(useragent.express());

app.get('*', async (req: any, res: any) => {
  if (req.useragent.isBot) {
    const lesson = (await db.doc(`lessons/${req.query.id}`).get())?.data();
    if (lesson) {
      res.send(buildHtml(lesson));
      return;
    }
  }
  res.send(file);
});

export const render = functions.region('asia-northeast1').https.onRequest(app);
