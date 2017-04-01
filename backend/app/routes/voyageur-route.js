/**
 * Created by GMI-PC on 24/03/2017.
 */
var jwt         = require('jwt-simple');
var Voyageur    = require('../../app/models/voyageur'); // get the mongoose model
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file


require('../../config/passport')(passport);
var apiVoyageur = express.Router();

apiVoyageur.post('/signup', function(req, res) {
    if (!req.body.name || !req.body.password || !req.body.email|| !req.body.login ) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        var role="voyageur_role";
        var newVoyageur = new Voyageur({
            'cin': req.body.cin,
            'User.name': req.body.name,
            'User.password': req.body.password,
            'User.email': req.body.email,
            'User.login': req.body.login,
            'User.role': role           
        });
        console.log(newVoyageur);
        // save the user
        newVoyageur.save(function(err) {
            console.log("here");
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

apiVoyageur.post('/authenticate', function(req, res) {
    Voyageur.findOne({
        'User.name': req.body.name
    }, function(err, voyageur) {
        if (err) throw err;

        if (!voyageur) {
            res.send({success: false, msg: 'Authentication failed. Voyageur not found.'});
        } //a fuckin problem here check it later!!!!!!!
        else {
            // check if password matches
            console.log("--------------------");
            console.log(voyageur.User.password);
            console.log(req.body.password);
            voyageur.User.comparePassword(req.body.password, function (err, isMatch) {
               // console.log(isMatch);
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(voyageur, config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }

    });
});
apiVoyageur.get('/memberinfo', passport.authenticate('jwt',{session: false}),function (req,res) {
    var token = getToken(req.headers);
    if (token){
        var decoded = jwt.decode(token,config.secret);
        Voyageur.findOne({
            'User.name': decoded.User.name
        }, function (err,voyageur) {
            if (err) throw err;
            if (!voyageur){
                return res.status(403).send({success: false, msg:"Authentifaiction failed" });
            }else {
                return res.json({success: true,msg: "Welcome to the member area ",voyageur: voyageur});
            }

        });

    }else {
        return res.status({success: false, msg: 'No token provided.'});

    }
});

//get voyageur by CIN
apiVoyageur.post('/getvoyageurbycin', function(req, res) {
    if (!req.body.cin ) { 
        res.json({success: false, msg: 'Please pass cin of voyageur.'});
    } else {
        Voyageur.findOne(
            {'cin':req.body.cin},
            function(err, voyageur) {
            if (err) throw err;
            if (!voyageur) {
                res.send({success: false, msg: 'fail to load Voyageur.'});
            } 
            else {
                res.json({success: true, voyageur: voyageur});  
            }

        });
    }
});
//get all voyageurs
apiVoyageur.get('/allvoyageur', function(req, res) {
    Voyageur.find({
    }, function(err, voyageur) {
        if (err) throw err;

        if (!voyageur) {
            res.send({success: false, msg: 'fail to load all voyageurs.'});
        } 
        else {
            res.json({success: true, voyageur: voyageur});  
        }

    });
});

apiVoyageur.put('/updatprofile/:id',function (req,res,next) {



     var newVoyageur = {
            'cin': req.body.cin,
            'User.email': req.body.email,
            'User.name': req.body.name,
            'User.image': req.body.image,
            'User.login': req.body.login,
            'User.password': req.body.password
        };
       newVoyageur.hashPassword(function(err) {
            console.log("here modification password");
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Erreur.'});
            }
            res.json({success: true, msg: 'Successful changed password new user.'});
        });

        console.log(newVoyageur);
        Voyageur.findByIdAndUpdate( req.params.id,newVoyageur,function (err,voyageur) {
            if (err){
             throw err;
            }else {
                return res.json({success: true,msg: "update voyageur Successful "+voyageur});
            }

        });

});
getToken =function (headers) {
    if (headers && headers.authorization){
        var parted =headers.authorization.split(' ');
        if (parted.length === 2){
            return parted[1];
        }else {
            return null;
        }
    }else {
        return null;
    }

};
module.exports = apiVoyageur;