'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    titulo : 'HTML5 Boilerplate',
    subtitulo : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    entradilla : 'Este es el texto de cada seccion',
    seccion : 'primeraSeccion',
    awesomeness: 10
  }, {
    titulo : 'AngularJS',
    subtitulo : 'AngularJS is a toolset for building the framework most suited to your application development.',
    entradilla : 'Este es el texto de cada seccion',
    seccion : 'segundaSeccion',
    awesomeness: 10
  }, {
    titulo : 'Karma',
    subtitulo : 'Spectacular Test Runner for JavaScript.',
    entradilla : 'Este es el texto de cada seccion',
    seccion : 'terceraSeccion',
    awesomeness: 10
  }, {
    titulo : 'Express',
    subtitulo : 'Flexible and minimalist web application framework for node.js.',
    entradilla : 'Este es el texto de cada seccion',
    seccion : 'cuartaSeccion',
    awesomeness: 10
  }, {
    titulo : 'MongoDB + Mongoose',
    subtitulo : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    entradilla : 'Este es el texto de cada seccion',
    seccion : 'quintaSeccion',
    awesomeness: 10
  }, function() {
      console.log('finished populating things');
    }
  );
});