'use strict';

angular.module('aplicacionCompleta2App')
	.controller('VentanaModalCtrl', function ($scope, $modalInstance) {

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
    
	});