'use strict';


var introguide = introJs();

$(document).ready(function() {
      var startbtn   = $('#startdemotour');
      
      introguide.setOptions({
        steps: [
          {
            element: '.ch-grid',
            intro: 'TVoy a reventarle la boca a kiko por gilipollas',
            position: 'bottom'
          },
          {
            element: '#primary',
            intro: 'Click this main logo to view a list of all Hongkiat demos.',
            position: 'left'
          },
          {
            element: '#primeraPagina .contenido-seccion',
            intro: 'Hover over each title to display a longer description.',
            position: 'bottom'
          },
          {
            element: '.titulo-primera-seccion',
            intro: 'Click this orange button to view the tutorial article in a new tab.',
            position: 'right'
          }
        ]
      });

      $('#startdemotour').bind('click', function (){
      });
      


      redrawDotNav();

        $(window).bind('scroll',function(e){
          parallaxScroll();
          redrawDotNav();
        });

      $('a.primeraSeccion').click(function(){
          $('html, body').animate({
            scrollTop:0
          }, 1000, function() {
            parallaxScroll(); 
        });
          return false;
      });

      $('a.segundaSeccion').click(function(){
        $('html, body').animate({
          scrollTop:$('#segundaSeccion').offset().top
        }, 1000, function() {
          parallaxScroll();
      });
        return false;
      });

      $('a.terceraSeccion').click(function(){
        $('html, body').animate({
          scrollTop:$('#terceraSeccion').offset().top
        }, 1000, function() {
          parallaxScroll();
      });
        return false;
      });

      $('a.cuartaSeccion').click(function(){
        $('html, body').animate({
          scrollTop:$('#cuartaSeccion').offset().top
        }, 1000, function() {
          parallaxScroll();
      });
        return false;
      });

      $('a.quintaSeccion').click(function(){
        $('html, body').animate({
          scrollTop:$('#quintaSeccion').offset().top
        }, 1000, function() {
          parallaxScroll();
      });
        return false;
      });

        $('nav#primary a').hover(
          function () {
          $(this).prev('h1').show();
        },
        function () {
          $(this).prev('h1').hide();
        }
        );
    });

    function parallaxScroll(){
      var scrolled = $(window).scrollTop();
      $('#parallax-bg1').css('top',(0-(scrolled*.30))+'px');
      $('#parallax-bg2').css('top',(0-(scrolled*.10))+'px');
    }

    function redrawDotNav(){
      var section1Top =  0;
      var section2Top =  $('#segundaSeccion').offset().top - (($('#terceraSeccion').offset().top - $('#segundaSeccion').offset().top) / 2);
      var section3Top =  $('#terceraSeccion').offset().top - (($('#cuartaSeccion').offset().top - $('#terceraSeccion').offset().top) / 2);
      var section4Top =  $('#cuartaSeccion').offset().top - (($(document).height() - $('#cuartaSeccion').offset().top) / 2);
      var section5Top =  $('#quintaSeccion').offset().top - (($(document).height() - $('#quintaSeccion').offset().top) / 2);
      $('nav#primary a').removeClass('active');
      if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
        $('nav#primary a.inicioPagina').addClass('active');
      } else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
        $('nav#primary a.segundaSeccion').addClass('active');
      } else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
        $('nav#primary a.terceraSeccion').addClass('active');
      } else if ($(document).scrollTop() >= section4Top){
        $('nav#primary a.cuartaSeccion').addClass('active');
      } else if ($(document).scrollTop() >= section5Top){
        $('nav#primary a.quintaSeccion').addClass('active');
      }

    }

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