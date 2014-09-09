'use strict';

angular.module('aplicacionCompleta2App')
	.controller('RuletaCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

		$scope.casillas = [];
		$scope.jugando = false;
		$scope.numeroInicial = 6;

		$scope.tipoRuleta = function(nombre) {
			$scope.jugando = true;
			for(var i=1; i<20; i++){
				$scope.casillas.push('images/'+nombre+'/'+i+'.jpg');
			}
			$timeout(function () {
		  		init();
		  		carousel.panelCount = 6;
	  			carousel.modify();
			}, 10);
		};

		$scope.elegirRuleta = function(){
			$scope.jugando = false;
		};

	}]);