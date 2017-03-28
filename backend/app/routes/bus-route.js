
var jwt         = require('jwt-simple');
var Bus    = require('../../app/models/bus'); // get the mongoose model
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');

var apiBus = express.Router();

apiBus.post('/addbs', function(req, res) {
    if (!req.body.available ) {
        res.json({success: false, msg: 'Please pass the availablity of the bus.'});
    } else {
        var newBus = new Bus({
            'available': req.body.available,
            'speed': req.body.speed,
            'numberp': req.body.numberp
        });
        console.log(newBus);
        // save the user
        newBus.save(function(err) {
            console.log("here");
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new Bus.'});
        });
    }
});
apiBus.get('/allbs', function(req, res) {
    Bus.find({
    }, function(err, buss) {
        if (err) throw err;

        if (!buss) {
            res.send({success: false, msg: 'fail to load all Buss.'});
        } 
        else {
            res.json({success: true, buss: buss});  
        }

    });
});

apiBus.get('/getbs/:id', function(req, res) {
    Bus.findById(req.params.id, function(err, bus) {
        if (err) throw err;

        if (!bus) {
            res.send({success: false, msg: 'fail to load Buss.'});
        } 
        else {
            res.json({success: true, bus: bus});  
        }

    });
});

apiBus.delete('/removebs/:id',function (req,res,next) {

        Bus.findByIdAndRemove(req.params.id, function (err,bus) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "delete Bus Successful "+bus._id});
            }

        });

});

apiBus.put('/updatbs/:id',function (req,res,next) {

     var newBus = {
            'available': req.body.available,
            'speed': req.body.speed,
            'numberp': req.body.numberp
        };
        console.log(req.params.id);
        Bus.findByIdAndUpdate( req.params.id,newBus,function (err,bus) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "update Bus Successful "+bus});
            }

        });

});


module.exports = apiBus;