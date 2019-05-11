const express = require('express');
const cors = require('cors');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);

// all the api links 
const api = require('./api');

// configurations for server
const portNumber = process.env.PORT || 3001;
const modeType = process.env.NODE_ENV || 'development';
const domainName = modeType === 'development' ? 'localhost' : 'www.bengkalatourism.com';

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
