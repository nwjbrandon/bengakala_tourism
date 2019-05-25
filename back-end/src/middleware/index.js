import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import db from '../storage';

const LocalStrategy = passportLocal.Strategy;

// Telling passport to use a Local Strategy to login with a username/email and password
passport.use(new LocalStrategy(
  // user will sign in using an email rather than a "username"
  {
    usernameField: 'email'
  },
  (async (email, password, done) => {
    const res = await db.fetchData('administrators', { email });
    if (res.length === 0) {
      return done(null, false, { message: 'user does not exist' });
    }
    if (bcrypt.compareSync(password, res[0].password)) {
      return done(null, { email, password });
    } else {
      return done(null, false, { message: 'incorrect password' });
    }
  })
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
