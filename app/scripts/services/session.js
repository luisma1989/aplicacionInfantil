'use strict';

angular.module('aplicacionCompleta2App')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
