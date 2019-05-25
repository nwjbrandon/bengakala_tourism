const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var expectedUser = {
  username: "jacob",
  password: "password"
}

// Telling passport we want to use a Local Strategy. In other words,
// we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: 'email'
  },
  ((email, password, done) => {
    if (email === expectedUser.username && password === expectedUser.password) {
      return done(null, {email, password});
    } else {
      return done(null, false, { message: 'incorrect'})
    }
  })
));

passport.serializeUser((email, done) => {
  console.log(email);
  done(null, email);
});

passport.deserializeUser((email, done) => {
  console.log(email);
  done(null, email);
});

export default passport;
