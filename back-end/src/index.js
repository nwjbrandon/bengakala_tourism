import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import redis from 'redis';
import connectRedis from 'connect-redis';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import api from './api';
import config from './config';
import db from './storage';
import swaggerSpec from './configuration/swagger';

const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', api);

if (process.platform === 'linux') {
  console.log('Starting redis and db server');
  db.testing().then(r => console.log(r));
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
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
  console.log('Note that this is a Windows os system. Redis and db will not start');
}

const startExpress = (portNumber) => {
  app.listen(portNumber);
};
startExpress(config.express.portNumber);
