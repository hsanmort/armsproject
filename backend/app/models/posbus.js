/**
 * Created by GMI-PC 
 */
// PosBus, Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PosbusSchema =new Schema({
    lat: {type: Boolean, index:true, required: true},
    lng: {type: Number, required: true},
    
    BusId:{
    	type: Schema.Types.ObjectId, 
    	ref:Bus
    }

  
});




module.exports = mongoose.model('Posbus', PosbusSchema);