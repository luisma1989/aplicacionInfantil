'use strict';

angular.module('aplicacionCompleta2App')
	.controller('MainCtrl', function mainController ($scope, $modal, Auth, $location) {

    $scope.open = function () {
	    var modal = $modal.open({
	      templateUrl: '/views/partials/ventanaModal.html',
	    });
    };

    $scope.ok = function () {
	    $modal.dismiss('cancel');
	  };

		$scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
	});