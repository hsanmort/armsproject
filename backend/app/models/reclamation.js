var Station    = require('../../app/models/voyageur');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReclamationSchema =new Schema({

    name: {type: String,  required: true},
    description: {type: String, required: true},
    image:{type :String},
    voyageurs : [{ type: Schema.Types.ObjectId, ref: 'Voyageur' }]

  
});

module.exports = mongoose.model('Reclamation', ReclamationSchema);