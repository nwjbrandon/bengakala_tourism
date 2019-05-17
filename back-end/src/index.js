import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressSwaggerGenerator from 'express-swagger-generator';
import api from './api';
import config from './config';
import { db } from './storage';

const app = express();
const expressSwagger = expressSwaggerGenerator(app);


// api links
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.use('/api', api);

const startExpress = (portNumber) => {
  app.listen(portNumber);
};

if (process.env.NODE_ENV === 'development') {
  // development mode

  // configurations for swagger docs
  expressSwagger(config.swaggerOptions);
  db.testing().then(r => console.log(r));
  startExpress(config.express.portNumber);
} else {
  // production mode

  // connect to mysql
  startExpress(config.express.portNumber);
}
