'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(express);

/**
 * Configuración del servidor Express
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Deshabilitar el almacenamiento en caché para las pruebas más fáciles
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');
  });

  app.configure('production', function(){
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    // MAntener sesiones con mongoStore
    app.use(express.session({
      secret: 'angular-fullstack secret',
      store: new mongoStore({
        url: config.mongo.uri,
        collection: 'sessions'
      }, function () {
          console.log("db connection open");
      })
    }));

    //uso de sesiones passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Router
    app.use(app.router);
  });

  // handler error
  app.configure('development', function(){
    app.use(express.errorHandler());
  });
};