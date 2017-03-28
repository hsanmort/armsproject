
var jwt         = require('jwt-simple');
var Station    = require('../../app/models/station'); // get the mongoose model
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');

var apiStation = express.Router();

apiStation.post('/addst', function(req, res) {
    if (!req.body.name ) {
        res.json({success: false, msg: 'Please pass name of station.'});
    } else {
        var newstation = new Station({
            'name': req.body.name,
            'Pos.lat': req.body.lat,
            'Pos.lng': req.body.lng
        });
        console.log(newstation);
        // save the user
        newstation.save(function(err) {
            console.log("here");
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new station.'});
        });
    }
});
apiStation.get('/allst', function(req, res) {
    Station.find({
    }, function(err, stations) {
        if (err) throw err;

        if (!stations) {
            res.send({success: false, msg: 'fail to load all stations.'});
        } 
        else {
            res.json({success: true, stations: stations});  
        }

    });
});

apiStation.get('/getst/:id', function(req, res) {
    Station.findById(req.params.id, function(err, station) {
        if (err) throw err;

        if (!station) {
            res.send({success: false, msg: 'fail to load stations.'});
        } 
        else {
            res.json({success: true, station: station});  
        }

    });
});

apiStation.delete('/removest/:id',function (req,res,next) {

        Station.findByIdAndRemove(req.params.id, function (err,station) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "delete station Successful "+station._id});
            }

        });

});

apiStation.put('/updatst/:id',function (req,res,next) {

     var newstation = {
            'name': req.body.name,
            'Pos.lat': req.body.lat,
            'Pos.lng': req.body.lng
        };
        console.log(req.params.id);
        Station.findByIdAndUpdate( req.params.id,newstation,function (err,station) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "update station Successful "+station});
            }

        });

});


module.exports = apiStation;