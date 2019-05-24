const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Telling passport we want to use a Local Strategy. In other words,
// we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: 'email'
  },
  ((email, password, done) => done(null, 'good job'))
));

passport.serializeUser(function(email, done) {
    console.log(email);
    done(null, email);
});

passport.deserializeUser(function(email, done) {
    console.log(email);
    done(null, email);
});

export default passport;