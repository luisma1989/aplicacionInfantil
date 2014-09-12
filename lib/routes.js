'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    glob = require('glob');

var middleware = require('./middleware');

/**
 * Rutas de la aplicación
 */
module.exports = function(app) {

  // Rutas del Servidor API
  app.get('/api/awesomeThings', api.awesomeThings);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // Todas las rutas que no estan definidas devolverán un error 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // Todas las otras rutas que usen Angular enrutarán en app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/obtenerFamilia/:familia', function (req, res) {

    glob('app/images/ImagenesRuletas/'+req.param('familia')+'/*.*', function (er, files) {
      // files is an array of filenames.
      // If the `nonull` option is set, and nothing
      // was found, then files is ["**/*.js"]
      // er is an error object or null.

      res.send(files);

    });

  });
  app.get('/*', middleware.setUserCookie, index.index);
};

