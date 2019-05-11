import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

// configurations for server
const portNumber = process.env.PORT || 3001;
const modeType = process.env.NODE_ENV || 'development';
const domainName = modeType === 'development' ? 'localhost' : 'www.bengkalatourism.com';

// all the api links 
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.use('/api', api);

// configurations for swagger docs
let options = {
  swaggerDefinition: {
    info: {
      description: 'Bengkala Tourism Website',
      title: 'Swagger Docs',
      version: '1.0.0',
    },
    host: `${ domainName }:${ portNumber }`,
    basePath: '/api',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./api/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)
app.listen(portNumber);
