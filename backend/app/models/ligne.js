/**
 * Created by GMI-PC 
 */
// PosBus, Model
var Station    = require('../../app/models/station');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LigneSchema =new Schema({

    name: {type: String,  required: true},
    description: {type: String, required: true},
    stations : [ Station ]

  
});

module.exports = mongoose.model('Ligne', LigneSchema);