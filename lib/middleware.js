'use strict';

/**
 * Middleware usado por la aplicación
 */
module.exports = {

  /**
   * Rutas protegidas en la API de accesos sin autentificación
   */
  auth: function auth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
  },

  /**
   * Establece una cookie para angular por lo que sabe que tenemos una sesión http
   */
  setUserCookie: function(req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
  }
};