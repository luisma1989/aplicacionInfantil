'use strict';

angular.module('aplicacionCompleta2App')
	.controller('RuletaCtrl', ['$scope', '$timeout', '$http', 'localStorageService', function ($scope, $timeout, $http, localStorageService) {

		$scope.ruletasPersonalizadas = localStorageService.get('ruletas');
		if($scope.ruletasPersonalizadas === null){
			$scope.ruletasPersonalizadas = [];
		}

		$scope.casillas = [];
		$scope.jugando = false;
		$scope.numeroInicial = 6;
		$scope.creandoRuleta = false;
		$scope.imagenActivada = false;
		$scope.errorRuleta = '';


		$scope.tipoRuleta = function(nombre, numeroCasillas) {
			$scope.creandoRuleta = false;
			$scope.jugando = true;
			for(var i=1; i<20; i++){
				$scope.casillas.push('images/'+nombre+'/'+i+'.jpg');
			}
			$scope.inicioRuleta(numeroCasillas);
		};

		$scope.inicioRuleta = function(numeroCasillas) {
			$timeout(function () {
		  		init();
		  		carousel.panelCount = numeroCasillas;
	  			carousel.modify();
			}, 500);
		}

		$scope.elegirRuleta = function(){
			$scope.jugando = false;
		};

		$scope.jugarRuleta =  function () {
			var increment = Math.ceil(Math.random()* 50 + 15);
      		carousel.rotation += carousel.theta * increment * -1;
        	carousel.transform();
		};

		$scope.familias = [ 'animales',
							'numeros'
							];

		$scope.estableceFiltroImagenes = function (filtro) {
			$scope.filtroImagenes = filtro;
		};

		$scope.mostrarImagenes = function (numeroCasillas) {
			$scope.creandoRuleta = true;
			$scope.imagenes = [];

			for (var i=0; i<$scope.familias.length; i++){
				$http.get('/obtenerFamilia/'+$scope.familias[i]).success(function (data) {
					console.log(data);
					angular.forEach(data, function(value, key) {
				       this.push({
							familia: $scope.familias[i],
							src: value.replace('app/','')
						});
				     }, $scope.imagenes);

				});
			}
		};

		$scope.seleccionImagenes = [];

		$scope.seleccionarImagen = function (img) {


			if($scope.seleccionImagenes.length > 20){
				return;
			}
			var posImg = $scope.seleccionImagenes.indexOf(img);
			if( posImg === -1){
				$scope.seleccionImagenes.push(img);
			}
			else{
				$scope.seleccionImagenes.splice(posImg, 1);
			}
		};

		$scope.crearRuleta = function (imagenes, guardar) {

			if(imagenes.length < 3){
				$scope.errorRuleta = 'debe seleccionar 3 o más imagenes';
				return;
			}

			$scope.errorRuleta = '';

			$scope.creandoRuleta = false;

			$scope.casillas = [];
			$scope.jugando = true;
			for(var i=0; i<imagenes.length; i++){
				$scope.casillas.push(imagenes[i].src);
			}
			for(var i=0; i<20-imagenes.length; i++){
				$scope.casillas.push(i);
			}
			$scope.inicioRuleta(imagenes.length);

			if(guardar){
				$scope.ruletasPersonalizadas.push(imagenes)
				localStorageService.add('ruletas', $scope.ruletasPersonalizadas);
			}
		};

		$scope.borrarRuletasPersonalizadas = function (){
			localStorageService.add('ruletas', []);
			$scope.ruletasPersonalizadas = [];
		};


	}]);