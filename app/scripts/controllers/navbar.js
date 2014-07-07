'use strict';

angular.module('aplicacionCompleta2App')
  .controller('NavbarCtrl', function ($scope, $location) {
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
