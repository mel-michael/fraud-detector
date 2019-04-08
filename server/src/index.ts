import * as express from 'express';
import { MongoClient } from 'mongodb';
import * as cors from 'cors';

import { apiRouter } from './api';
import { appMiddleware, errorHandler } from './middleware';
import { default as config, ENV } from './config';

let app = express();
let MONGO_URL;

(async function() {
  // Database Connection URL
  if (config.environment === ENV.dev) {
    MONGO_URL = `mongodb://${config.db_host}/${config.db_name}`
  } else {
    MONGO_URL = `mongodb://${config.db_user}:${config.db_password}@${config.db_host}/${config.db_name}`;
  }

  // Database Name
  const dbName = 'detectors';
  const client = new MongoClient(MONGO_URL);

  try {
    // Use connect method to connect to the Server
    await client.connect();
    const db = client.db(dbName);

    // Expose Mongo connection globally
    app.locals.connection = db;
  } catch (err) {
    console.log(err.stack);
  }

})();


app.use(cors());
app.use(appMiddleware(app));
app.use('/api', apiRouter);
app.use(errorHandler);

export default app;
