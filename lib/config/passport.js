'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/**
 * Configuración de Passport 
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, '-salt -hashedPassword', function(err, user) { 
    done(err, user);
  });
});

// añade otras estrategisas para tener más flexibilidad en al autentificación
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return done(err);
      
      if (!user) {
        return done(null, false, {
          message: 'Esta dirección de correo no está registrada.'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Esta contraseña no es correcta.'
        });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;