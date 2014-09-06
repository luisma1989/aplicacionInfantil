'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');
  
var authTypes = ['github', 'twitter', 'facebook', 'google'];

/**
 * Esquema de usuario
 */
var UserSchema = new Schema({
  name: String,
  apellidos: String,
  edad: Number,
  email: String,
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
});

/**
 * Virtual
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Información básica que identifica al usuario de la aplicación
UserSchema
  .virtual('userInfo')
  .get(function() {
    return {
      'name': this.name,
      'apellidos': this.apellidos,
      'edad': this.edad,
      'email': this.email,
      'role': this.role,
      'provider': this.provider
    };
  });

// Información pública del usuario
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role,
      'apellidos': this.apellidos,
      'edad': this.edad,
      'email': this.email
    };
  });
  
/**
 * Validaciones
 */

// Valida si el email está vacio
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'La dirección de correo no puede estar en blanco.');

// Valida si la contraseña está vacia
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'La contraseña no puede estar en blanco.');

// Valida si ya está en uso la dirección de correo
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'Esta dirección de correo ya está en uso.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Autentificación -  comprueba que la contraseña es correcta
   *
   * @parametro {String} texto
   * @devuelve {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @devuelve {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encripta la contraseña
   *
   * @parametro {String} password
   * @devuelve {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);