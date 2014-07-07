'use strict';

angular.module('aplicacionCompleta2App')
  .controller('UsuarioCtrl', function ($scope, User, Auth, $location) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.User.oldPassword, $scope.User.newPassword )
        .then( function() {
          $scope.message = 'Tu contraseña ha sido actualizada.';
          $location.path('/');
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Contraseña incorrecta';
        });
      }
		};
  });
