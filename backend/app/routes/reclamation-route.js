
var jwt         = require('jwt-simple');
var Reclamation    = require('../../app/models/reclamation'); // get the mongoose model
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');
var bodyParser = require('body-parser').json();


var apiReclamation = express.Router();

apiReclamation.post('/addrec', function(req, res) {

    if ( !req.body.name  ) {
        res.json({success: false, msg: 'Please pass the rec .'});
    } else {
        var newReclamation = new Reclamation({
            'name': req.body.name,
            'description': req.body.description,
            'image': req.body.image
        });
        console.log(newReclamation);
        // save the user
        newReclamation.save(function(err) {
            console.log("here");
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new Reclamation.'});
        });
    }
});

apiReclamation.get('/allrec', function(req, res) {
    Reclamation.find({
    }, function(err, reclamations) {
        if (err) throw err;

        if (!reclamations) {
            res.send({success: false, msg: 'fail to load all Reclamation.'});
        } 
        else {
            res.json({success: true, reclamations: reclamations});  
        }

    });
});

apiReclamation.get('/getrec/:id', function(req, res) {
    Reclamation.findById(req.params.id, function(err, reclamation) {
        if (err) throw err;

        if (!reclamation) {
            res.send({success: false, msg: 'fail to load reclamations.'});
        } 
        else {
            res.json({success: true, reclamation: reclamation});  
        }

    });
});

module.exports = apiReclamation;