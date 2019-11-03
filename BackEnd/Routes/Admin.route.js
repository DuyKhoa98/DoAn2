const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const adminRoute = express.Router();
let RankUser = require('../Models/rankUser.model');
let Account =require('../Models/userData.model');
let PolicyPoint=require('../Models/policyPoint.model')
adminRoute.route('/RankPassenger').get(urlencodedParser,function(request,result){
    RankUser.find(function(err,listRank){
        if(err){
            console.log(err);
        }
        else{
            res.json(listRank);
        }
    });
});

adminRoute.route('/CalcPoint').post(urlencodedParser,function(req,res){
    var uidPassenger=req.body.uidpassenger;
    var uidDriver=req.body.uiddriver;
    var price=req.body.uid;

    var a=price % 10000; //lay du
    var s=(price-a) / 10000;//lay nguyen
    Account.findById({_id:uidPassenger}).exec(function(err, accountPassenger){
        if(account!=null)
        {
            RankUser.findById({_id:account.RankID}).exec(function(err, rankuser){
                
            })
        }else{
            res.json({"Status":false,"Message":"Không tìm thấy user!"})
        }
    });
});


module.exports = adminRoute;