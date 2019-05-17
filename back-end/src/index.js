import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import redis from 'redis';
import connectRedis from 'connect-redis';
import api from './api';
import config from './config';
//import db from './storage';

const RedisStore = connectRedis(session);

const app = express();
const redisClient = redis.createClient();




const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuration/swagger')
// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// api links
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.use('/api', api);
if (process.platform === 'linux') {
  console.log('Starting redis server');
  redisClient.on('error', (err) => {
    console.log('Redis error:', err);
  });
  app.use(session({
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: 'redisPractice',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}, // Note that the cookie-parser module is no longer needed
    store: new RedisStore({host: 'localhost', port: 6379, client: redisClient, ttl: 86400}),
  }));
} else {
  console.log('Note that redis cannot run on windows.');
}
const startExpress = (portNumber) => {
  app.listen(portNumber);
};

if (process.env.NODE_ENV === 'development') {
  //db.testing().then(r => console.log(r));
  startExpress(config.express.portNumber);
} else {
}
