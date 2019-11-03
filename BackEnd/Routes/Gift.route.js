const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const giftRoute = express.Router();
let Gift = require('../Models/gift.model');

giftRoute.route('/addGift').post(urlencodedParser,function(request,result){
    var PointFrom = req.body.pointFrom;
    var RankID=req.body.rankID;
    var GiftCode=req.body.giftCode;
    var PointToReward=req.body.pointToReward;
    var GiftQuantity=req.body.giftQuantity;
    var  ExpDate=req.body.expDate;
    let gift=new Gift();
    if(!checkCode(GiftCode)){
        result.send("GiftCode đã được sử dụng");
        return;
    }
    gift.PointFrom=PointFrom;
    gift.PointTo=PointTo;
    gift.RankID=RankID;
    gift.GiftCode=GiftCode;
    gift.GiftQuantity=GiftQuantity;
    gift.PointToReward=PointToReward;
    gift.ExpDate=ExpDate;
    gift.save().then(s=>{
        result.status(200).json({"status":true,"message":"Reward added successfully!"});
    }).catch(err=>{
        result.status(400).json({"status":false,"message":err});
    });    
 
});
function checkCode(code){
    Gift.findById({GiftCode:code}).exec(function(err,gift){
        if(err)
        {
            return false;
        }
        if(gift!=null){
            return false;
        }
        
    });
}


module.exports = giftRoute;