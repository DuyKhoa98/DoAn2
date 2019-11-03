const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const redemReward = express.Router();
let GiftNomal = require('../Models/gift.model');
let Account =require('../Models/userData.model');
let HistoryRedem=require('../Models/historyRedem.model')
const checked={};
redemReward.route('/RedemReward').post(urlencodedParser,(req,res)=>{
    var UID=req.body.uid;
    var GiftID=req.body.giftID;
    Account.findById({_id:UID}).exec(function(err, account){
        if(account!=null){
                GiftNomal.findById({_id:GiftID}).exec(function(err,gift){
                    CheckGift(gift);
                    if(!checked.check){
                        res.send(checked.message);
                        return;
                    }
                    else if(account.Point >= gift.PointFrom){
                            if(account.RankID>=gift.RankID){
                                let h =new HistoryRedem();
                                h.UID=UID;
                                h.GiftID=GiftID;
                                h.GiftType=TypeGift;
                                h.CreatedDate=Date.now();    
                                h.save().then(s => {
                                                gift.GiftQuantity-=1;
                                                gift.save().then().catch(err=>{
                                                    res.status(400).send(err);
                                                });
                                                res.status(200).json({'Status':"Success",'Message':'Số điểm đã đổi '+gift.PointToRewad});
                                            })
                                            .catch(err => {
                                                res.status(400).send(err);
                                            });
                            }
                            else{
                                res.send("Rank của bạn chưa đạt yêu cầu!");
                            }
                            
                        }else{
                            res.send("Điểm của bạn không đủ!");
                        }             
              
                        
                })

        }else{
            res.send("ERROR");
        }
    });
})

function CheckGift(gift){
 
        if(gift== null)
        {
            checked.check=false;
            checked.message="Không tìm thấy quà"
            return checked;
        }
        else if(gift.GiftQuantity>0){
            checked.check=false;
            checked.message="Quà đã hết"
            return checked;
        }
        else {
            checked.check=true;
            return checked;
        }
}
module.exports = redemReward;