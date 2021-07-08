const User = require("../models/User.model");
const mongoose = require("mongoose");
const passport = require("passport");

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

module.exports.registerNewUser = (req, res, next) => {
    res.render("registrationForm")
}

module.exports.doRegisterNewUser = (req, res, next) => {
    
    const { email, fullName, password } = req.body;

    //comprobación de usuario existente 
    if (!email || !password) {
        res.render('registrationForm', { errorMessage: 'Indicate email, full name and password' });
        return;
      }

      User.findOne({ email })
      .then(user => {

        if (user !== null) {
          res.render('registrationForm', { message: 'The email already exists' });
          return;
        }  

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashPass
        });

        //Guardar nuevo usuario
        newUser
        .save()
        .then(() => res.redirect('/'))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

module.exports.login = (req, res, next) => {
    res.render("login")
}

module.exports.doLogin = (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
          // Something went wrong authenticating user
          return next(err);
        }
     
        if (!theUser) {
          // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
          res.render('login', { errorMessage: 'Wrong password or username' });
          return;
        }
     
        // save user in session: req.user
        req.login(theUser, err => {
          if (err) {
            // Session save went bad
            return next(err);
          }
     
          // All good, we are now logged in and `req.user` is now set
          res.redirect('/');
        });
    })
};
