'use strict';

angular.module('aplicacionCompleta2App')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.informacion = awesomeThings;
    });
  });