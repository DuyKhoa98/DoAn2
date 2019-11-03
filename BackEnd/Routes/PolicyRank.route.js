const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const policyRank = express.Router();
let PolicyRanks = require('../Models/policyRank.model');

policyRank.route('/GetPolicyRank').get(urlencodedParser,(req,res)=>{
    PolicyRanks.find((err,ranks)=>{
        if(err){
            res.send(err);
        } 
        else{
            res.json(ranks);
        }
    })
})

policyRank.route('/addPolicyRank').post(urlencodedParser,function(req,res){


    let l =new PolicyRanks();
    var pointFrom=req.body.pointFrom;
    var pointTo=req.body.pointTo;
    var rankID=req.body.rankID;
    var description=req.body.description;
    l.PointFrom=pointFrom;
    l.PointTo=pointTo;
    l.RankID=rankID;
    l.Description=description;
    l.CreatedDate=Date.now();
    l.save()
        .then(s => {
            res.status(200).send('PolicyRank in added successfully');
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
module.exports = policyRank;