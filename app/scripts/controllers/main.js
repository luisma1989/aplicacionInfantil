'use strict';

angular.module('aplicacionCompleta2App')
	.controller('MainCtrl', function mainController ($scope, $modal, Auth, $location) {

    $scope.open = function () {
	    var ventanaModal = $modal.open({
	      templateUrl: '/views/partials/ventanaModal.html',
	      controller: 'VentanaModalCtrl'
	    });
    };

		$scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
	});