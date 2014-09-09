'use strict';

angular.module('aplicacionCompleta2App')
	.controller('RuletaCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

		$scope.casillas = [];

		for(var i=0; i<20; i++){
			$scope.casillas.push('http://lorempixel.com/400/400/?'+i);
		}

		//TODO: cambiar a evento cuando acabe el ng-repeat
		$timeout(function () {
	  		init();
	  		carousel.panelCount = 6;
  			carousel.modify();
		}, 10);


	}]);