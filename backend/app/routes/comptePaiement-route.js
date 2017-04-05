var jwt         = require('jwt-simple');
var ComptePaiement    = require('../../app/models/voyageur');// get the mongoose model
//var voyageur	= require('../../app/models/voyageur'); 
var passport	= require('passport');
var express     = require('express');
var config      = require('../../config/database'); // get db config file
var mongoose    = require('mongoose');


require('../../config/passport')(passport);
var apiComptePaiement = express.Router();


apiComptePaiement.post('/addcptpaiement', function(req, res) {
    if (!req.body.cin ||  !req.body.numcard || !req.body.credits) {
        res.json({success: false, msg: 'Veuillez remplir les champs.'});
    } else {
    	ComptePaiement.findOne(
            {'cin':req.body.cin, 'ComptePaiement.ishere': false},
            function(err, comptePaiement) {
	            if (err) throw err;
	            if (!comptePaiement) {
	                {	
				        var newcptpaiement = new ComptePaiement({
				        	'CIN': req.body.cin,
				            'NumberCard': req.body.numcard,
				            'solde': req.body.credits
				        });
				        console.log(newcptpaiement);
				        // save the user
				        newcptpaiement.save(function(err) {
				            //console.log("here");
				            if (err) {
				                console.log(err);
				                return res.json({success: false, msg: 'Erreur.'});
				            }
				            res.json({success: true, msg: 'compte créé avec succes.'});
				        });
			        }
	            } 
	            else {
	                res.json({success: false, msg:'ce voyageur a dejà un compte de paiement ou il n\'existe pas.'});  
	            }
        });
    	
    }
});
apiComptePaiement.post('/findcptpaiement', function(req, res) {
    if (!req.body.cin) {
        res.json({success: false, msg: 'Veuillez saisir le numero de CIN du voyageur.'});
    } else {	
        ComptePaiement.findOne(
            {'cin':req.body.cin},
            function(err, ComptePaiement) {
	            if (err) throw err;
	            if (!ComptePaiement) {
	                res.send({success: false, msg: 'pas de compte payement pour ce voyageur.'});
	            } 
	            else {
	                res.json({success: true, ComptePaiement: ComptePaiement});  
	            }
        });
    }
});

apiComptePaiement.get('/allaccounts', function(req, res) {
    ComptePaiement.find({'ComptePaiement.ishere': true
    }, function(err, comptePaiement) {
        if (err) throw err;

        if (!comptePaiement) {
            res.send({success: false, msg: 'fail to load all Paiementaccounts.'});
        } 
        else {
            res.json({success: true, comptepaiement: comptePaiement});  
        }

    });
});

apiComptePaiement.delete('/removecptpaiement/:id',function (req,res,next) {
	    	ComptePaiement.findByIdAndRemove(req.params.id, function (err,comptePaiement) {
	            if (err){
	             throw err;
	             console.log(err);
	            }else {
	                return res.json({success: true,msg: "compte de paiement supprime avec succes "+comptePaiement.id});
	            }

	        });
    	
});
module.exports=apiComptePaiement;