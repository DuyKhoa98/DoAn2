const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const policyPoint = express.Router();
let PolicyPoints = require('../Models/policyPoint.model');

policyPoint.route('/GetPolicyPoint').get(urlencodedParser,(req,res)=>{
    PolicyPoints.find((err,points)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json(points);
        }
    })
})


policyPoint.route('/addPolicyPoint').post(urlencodedParser,function(req,res){

    let l =new PolicyPoints();
    var rankID=req.body.rankID;
    var bonusbyCash=req.body.bonusbyCash;
    var bonusbyWallet=req.body.bonusbyWallet;
    l.RankID=rankID;
    l.BonusPointByCash=bonusbyCash;
    l.BonusPointByWallet=bonusbyWallet;
    l.CreatedDate=Date.now();
    l.save()
        .then(s => {
            res.status(200).send('PolicyPoint in added successfully');
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
module.exports = policyPoint;