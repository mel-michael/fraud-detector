import * as express from 'express';
import { MongoClient } from 'mongodb';
import * as cors from 'cors';

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

app.use(cors());
app.use(appMiddleware(app));
app.use('/api', apiRouter);
app.use(errorHandler);

export default app;
