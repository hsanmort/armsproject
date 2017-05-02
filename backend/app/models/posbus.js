/**
 * Created by GMI-PC 
 */
// PosBus, Model
var Bus    = require('../../app/models/bus');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PosbusSchema =new Schema({
    lat: {type: Number,  required: true},
    lng: {type: Number, required: true},

});

module.exports = mongoose.model('Posbus', PosbusSchema);