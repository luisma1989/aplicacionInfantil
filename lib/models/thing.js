'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var ThingSchema = new Schema({
  titulo: String,
  subtitulo: String,
  entradilla: String,
  seccion: String,
  awesomeness: Number
});

/**
 * Validations
 */
ThingSchema.path('awesomeness').validate(function (num) {
  return num >= 1 && num <= 10;
}, 'Awesomeness must be between 1 and 10');

mongoose.model('Thing', ThingSchema);
