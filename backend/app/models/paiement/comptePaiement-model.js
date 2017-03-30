/**
 * Created by mohamedchaar on 22/03/17.
 */
/**
 * Created by mohamedchaar on 22/03/17.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * ComptePaiement Schema
 */

var ComptePaiement =new Schema({
    CIN: {
        type: Number,
        required: true},
    NumberCard: {
        type: Number,
        required: true,
        unique: true },
    solde: {type: Number,
        required: true,
        }
});
module.exports = mongoose.model('ComptePaiement', ComptePaiement);