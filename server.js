'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

/**
 * Archivo principal de la aplicación
 */

// Inicializa por defecto el tipo de entorno a desarrollo
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Configuración de la aplicación
var config = require('./lib/config/config');

// Conexión con la base de datos
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Modelos de Bootstrap
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

require('./lib/config/dummydata');
  
// Configuración de Passport
var passport = require('./lib/config/passport');

var app = express();

// Opciones de Express
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;