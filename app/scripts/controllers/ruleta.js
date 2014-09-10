'use strict';

angular.module('aplicacionCompleta2App')
	.controller('RuletaCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

		$scope.casillas = [];
		$scope.jugando = false;
		$scope.numeroInicial = 6;

		$scope.tipoRuleta = function(nombre, numeroCasillas) {
			$scope.jugando = true;
			for(var i=1; i<20; i++){
				$scope.casillas.push('images/'+nombre+'/'+i+'.jpg');
			}
			$timeout(function () {
		  		init();
		  		carousel.panelCount = numeroCasillas;
	  			carousel.modify();
			}, 10);
		};

		$scope.elegirRuleta = function(){
			$scope.jugando = false;
		};


		$scope.jugarRuleta =  function () {
			var increment = Math.ceil(Math.random()* 50 + 15);
      		carousel.rotation += carousel.theta * increment * -1;
        	carousel.transform();
		};

	}]);