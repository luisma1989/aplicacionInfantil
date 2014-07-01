'use strict';

angular.module('aplicacionCompleta2App')
  .controller('UsuarioCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;

      $scope.user = {};

    });
  });
