'use strict';

    var introguide = introJs();

    $(document).ready(function() {
        introguide.setOptions({
        steps: [
          {
            element: '.ch-grid',
            intro: 'Menú principal de la aplicación',
            position: 'bottom'
          },
          {
            element: '#primerItem',
            intro: 'Aquí puedes acceder a la aplicación con tu usuario',
            position: 'bottom'
          },
          {
            element: '#segundoItem',
            intro: 'Aquí puedes crear un usuario',
            position: 'bottom'
          },
          {
            element: '#cuartoItem',
            intro: 'Sección donde se describe el proyecto',
            position: 'bottom'
          },
          {
            element: '#quintoItem',
            intro: 'Formulario de contacto',
            position: 'bottom'
          },
          {
            element: '#primary',
            intro: 'Menú lateral de navegación por la página principal',
            position: 'left'
          },
          {
            element: '#primeraPagina .contenido-seccion',
            intro: 'Éste es contenido de cualquier sección de la página principal, en este caso el primer juego',
            position: 'right'
          },
          {
            element: '.titulo-primera-seccion',
            intro: 'Este título en un enlace a la sección',
            position: 'right'
          }
        ]
      });
    });

  angular.module('aplicacionCompleta2App')
	.controller('MainCtrl', function mainController ($scope, $modal, Auth, $location) {


        $scope.empiezaTour = function () {
            introguide.start();
        };

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