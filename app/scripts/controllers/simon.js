'use strict';

angular.module('aplicacionCompleta2App')
  .controller('SimonCtrl', function ($scope, localStorageService) {
    $scope.resultados = localStorageService.get('resultados');

    if($scope.resultados === null){
      $scope.resultados = [];
    }

    $scope.jugando = false;

    $scope.empieza = function(dificultad){
      $scope.dificultad = dificultad;
      $scope.jugando = true;
    };

    $scope.muestraResultado = function (resultado){
      $scope.jugando = false;
      $scope.resultado = resultado;
      $scope.resultados.push(resultado);
      $scope.resultados.sort(function (a, b){
        return a.movimientos - b.movimientos;
      });
      resultado.posicion = $scope.resultados.indexOf(resultado) + 1;
    
      localStorageService.add('resultados',$scope.resultados);

    };

  });
