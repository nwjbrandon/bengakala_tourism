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

const router = express.Router();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', api);

// implementation for linux developers
if (process.platform === 'linux') {
  console.log('Starting redis and db server');
  db.testing().then(r => console.log(r));
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  redisClient.on('error', (err) => {
    console.log('Redis error:', err);
  });
  app.use(session({
    secret: 'shhh',
    name: 'redisPractice',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      client: redisClient,
      ttl: 86400
    }),
  }));
} else {
  console.log('Note that this is a Windows os system. Redis and db will not start');
}
router.get('/', (req, res) => {
  let sess = req.session;
  console.log(sess);
  if (sess.email) {
    return res.send('hello');
  }
});
router.post('/login',(req,res) => {
  console.log(req.body);
  console.log(req.body.email);
  req.session.email = req.body.email;
  console.log('hhi');
  res.end('done');
});

router.get('/admin',(req,res) => {
  if(req.session.email) {
    res.write(`<h1>Hello ${req.session.email} </h1><br>`);
    res.end('<a href='+'/logout'+'>Logout</a>');
  }
  else {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href='+'/'+'>Login</a>');
  }
});

router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });

});

app.use('/', router);
const startExpress = (portNumber) => {
  app.listen(portNumber);
};
startExpress(config.express.portNumber);
