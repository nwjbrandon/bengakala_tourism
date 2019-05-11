import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import r from 'rethinkdb';
import api from './api';
import config from './config.js'

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

// api links 
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.use('/api', api);

if (process.env.NODE_ENV === 'development') {
  // development mode
  
  // configurations for swagger docs
  expressSwagger(config.swaggerOptions);

  // connect to rethink
  /*
  r.connect(config.rethinkdb, (err, conn) => {
    if (err) {
      console.log('Could not open a connection to initialize the database');
      process.exit(1);
    } else {
      r.table('Attraction').run(conn).then((err, result) => {
      }).error(err => {
        console.log('Table Attraction not found');
        r.db(config.rethinkdb.db).run(conn).finally(() => {
          return r.tableCreate('Attraction').run(conn);
        })
      })

    }
  })
  */
  startExpress(config.express.portNumber);
} else {
  // production mode
  
  // connect to mysql
  startExpress(config.express.portNumber);
}

const startExpress = (portNumber) => { app.listen(portNumber) };
