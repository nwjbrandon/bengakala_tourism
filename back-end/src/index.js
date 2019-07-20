import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import redis from 'redis';
import connectRedis from 'connect-redis';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import api from './api';
import config from './config';
import { cookieSecret } from './secret/cookieSecret';
import { redisSecret } from './secret/redisSecret';

const app = express();

// implementation for linux developers
console.log('Attempting to initialize redis and mysql server is setup for your machines');
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.log('Redis error:', err);
});
app.use(session({
  secret: redisSecret,
  name: 'bengkala_tourism',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
    ttl: 60 * 60,
  }),
}));

app.use(cookieParser(cookieSecret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);

const startExpress = (portNumber) => {
  app.listen(portNumber);
};
startExpress(config.express.portNumber);
console.log('Successfully initialize redis and mysql server is setup for your machines');
