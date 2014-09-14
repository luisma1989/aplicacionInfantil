
'use strict';

angular.module('aplicacionCompleta2App')
  .service('Tones', function Tones($timeout) {
    var context = new webkitAudioContext();
    function getFrequency(tone){
      switch(tone){
        case 1:
          return 329.628; // Verde
        case 2:
          return 440; // Rojo
        case 3:
          return 659.255; // Azul
        case 4:
          return 554.365;// Amarillo
      }
    }
    this.play = function (tone, time) {
      var oscillator = context.createOscillator();
      oscillator.connect(context.destination);
      oscillator.type = 3;
      oscillator.frequency.value = getFrequency(tone);
      oscillator.noteOn(0);// Start generating sound
      $timeout(function (){
        oscillator.noteOff(0);
      }, time);
    };
  });
