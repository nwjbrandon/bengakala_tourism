import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import redis from 'redis';
import connectRedis from 'connect-redis';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import api from './api';
import config from './config';
import swaggerSpec from './configuration/swagger';

const app = express();

// implementation for linux developers
console.log('Ensure redis and db server is setup for linux machines');
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.log('Redis error:', err);
});
app.use(session({
  secret: 'password',
  name: 'Bengkala Tourism',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
    ttl: 86400
  }),
}));

app.use(cookieParser('secretSign#143_!223'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', api);

const startExpress = (portNumber) => {
  app.listen(portNumber);
};
startExpress(config.express.portNumber);
