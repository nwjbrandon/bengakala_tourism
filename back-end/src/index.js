import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressSwaggerGenerator from 'express-swagger-generator';
import redis from 'redis';
import connectRedis from 'connect-redis';
import api from './api';
import config from './config';
import db from './storage';

const RedisStore = connectRedis(session);


const app = express();
const redisClient = redis.createClient();
const expressSwagger = expressSwaggerGenerator(app);

// api links
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.use('/api', api);

redisClient.on('error', (err) => {
  console.log('Redis error:', err);
});

app.use(session({
  secret: 'ThisIsHowYouUseRedisSessionStorage',
  name: '_redisPractice',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}));

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
}
