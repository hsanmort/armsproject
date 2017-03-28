/**
 * Created by GMI-PC 
 */
// Bus, Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusSchema =new Schema({
	
    available: {type: Boolean, required: true},
    speed: {type: Number, required: true},
    numberp:{type: Number, required: true}

  
});




module.exports = mongoose.model('Bus', BusSchema);