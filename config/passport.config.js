const session = require('express-session');

const User = require("../models/User.model");
 
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Configurar los métodos para que funcione passport
passport.serializeUser((user, cb) => cb(null, user._id));
 
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});

passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      {
        usernameField: 'email', // by default
        passwordField: 'password' // by default
      },
      (email, password, done) => {
        User.findOne({ email })
          .then(user => {
            if (!user) {
              return done(null, false, { message: 'Incorrect email or password' });
            }
   
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, { message: 'Incorrect password' });
            }
   
            done(null, user);
          })
          .catch(err => done(err));
      }
    )
  );