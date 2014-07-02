'use strict';

angular.module('aplicacionCompleta2App')
	.controller('MainCtrl', function mainController ($scope, $modal) {

    $scope.open = function () {

	    var modal = $modal.open({
	      templateUrl: '/views/partials/ventanaModal.html',
	    });
    };

    $scope.ok = function () {
	    $modal.close();
	  };

	});
