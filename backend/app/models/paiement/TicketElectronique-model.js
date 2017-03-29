/**
 * Created by mohamedchaar on 22/03/17.
 */
/**
 * Created by mohamedchaar on 22/03/17.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * TicketElectronique Schema
 */

var TicketElectronique = new Schema({

    IdReseau:[{
        type: Schema.ObjectId,
        ref: 'Reseau',
        index: true }],
    IdDuree: {
        type: Schema.ObjectId,
        ref: 'duree',
        index: true },
    Price:{
        type: number,
        index: true},
    Title:{
        type: String,
        index: true },
    Description:{
        type: String,
        index: true }

});
module.exports = mongoose.model('Ticket', TicketElectronique);
