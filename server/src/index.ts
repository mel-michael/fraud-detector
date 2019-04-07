import * as express from 'express';
import { MongoClient } from 'mongodb';

import { apiRouter } from './api';
import { appMiddleware, errorHandler } from './middleware';

let app = express();
const MONGO_URL = "mongodb://localhost:27017/";

MongoClient
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(client => {
    const db = client.db('detectors');
    app.locals.connection = db;
  })
  .catch(error => console.error(error));

// MongoClient
//   .connect(mongo_uri, {useNewUrlParser: true})
//   .then(client => {
//     const db = client.db('my-db');
//     const collection = db.collection('my-collection');
//     app.listen(port, () => console.info(`REST API running on port ${port}`));
//   })
//   .catch(error => console.error(error));

// MongoClient.connect(URL, function (err: any, db: any) {
//   if (err) {
//     throw err;
//   }
//   console.log("Database connected!");
//   db.close();
// });

console.log('home');

app.use(appMiddleware(app));
app.use('/api', apiRouter);
app.use(errorHandler);

export default app;
