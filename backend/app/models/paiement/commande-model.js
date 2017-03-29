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
 * CommandSchema Schema
 */
var Date = new Schema({
  Date: date,
  Heure:date,

});
var CommandSchema = new Schema({
    Idguichetier:{
        type: Schema.ObjectId,
        ref: 'guichetier'
    },
    Lignes:[{
        type: Schema.ObjectId,
        ref: 'Ligne',
    
    }],
    IdComptePaiement: {
        type: number,
     },
    Montant:{
        type: number,
     },
    IdTicket:{
        type: Schema.ObjectId,
        ref: 'Ticket',
     },
    DatePaiement:{
        type:[Date],
        },
    DateEcheance:{
        type:[Date],
        }

});
module.exports = mongoose.model('Command', CommandSchema);
