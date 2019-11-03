const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const RewardRoute = express.Router();

let Rewards = require('../DataBase/tbl_reward');

 RewardRoute.route('/Create').post(urlencodedParser,function(req,res){
    var Code=req.body.code;
    var PointToBuy=req.body.pointToBuy;
    var ExpDate=req.body.expDate;
    var RankID=req.body.RankID;
    var ServiceID=req.body.ServiceID;
    var ValueDiscount=req.body.valueDiscount;
    var PercentDiscount=req.body.percentDiscount;
    var MinBillValue=req.body.minBillValue;
    var Description=req.body.description; 
 
    Rewards.findOne({Code:Code}).exec(function(err,rew){
            if(err!=null)
            {
                res.json({"status":false,"message":err});
                return;
            }
            else if(rew!=null){
                res.json({"status":false,"message":"Code đã được sử dụng",val:rew});
                return;      
               
            }
            else{                    
                let reward =new Rewards();
                reward.Code=Code;
                reward.PointToBuy=PointToBuy;
                reward.ExpDate=ExpDate;
                reward.RankID=RankID;
                reward.ServiceID=ServiceID;
                reward.CreatedDate=Date.now();
                if(ValueDiscount!=null){
                    reward.ValueDiscount=ValueDiscount;
                }
                if(PercentDiscount!=null){
                    reward.PercentDiscount=PercentDiscount;
                }
                if(MinBillValue!=null){
                    reward.MinBillValue=MinBillValue;
                }
                if(Description!=null){
                    reward.Description=Description;
                }    
                var ck = ValidateReward(reward);
                if(ck.status!=true){
                    res.json(ck);
                    return;
                }   
                else{
                    reward.save().then(s=>{
                        res.status(200).json({"status":true,"message":"Reward added successfully!"});
                    }).catch(err=>{
                        res.status(400).json({"status":false,"message":err});
                    });  
                }       
               
            }         
            
        });

});

RewardRoute.route('/GetByCode/:code').get(urlencodedParser,function(req,res){
    let  rewardcode=req.params.code;    
    Rewards.findOne({Code:rewardcode}, function (err, rew){
        if(err!=null){
            res.json({"status":false,"message":err});
            return;
        }     
        if(rew!=null){
            res.json(rew);  
        }
        else{
            res.json({"status":false,"message":"reward not found"});
        }
    });
});

RewardRoute.route('/Edit/:code').post(urlencodedParser,function(req,res){
    let  rewardcode=req.params.code;
    Rewards.findOne({Code:rewardcode}, function (err, rew){
        if(err!=null){
            res.json({"status":false,"message":err});
            return;
        }     
        if(rew!=null){      
            var PointToBuy=req.body.pointToBuy;
            var ExpDate=req.body.expDate;
            var RankID=req.body.RankID;
            var ServiceID=req.body.ServiceID;
            var ValueDiscount=req.body.valueDiscount;
            var PercentDiscount=req.body.percentDiscount;
            var MinBillValue=req.body.minBillValue;
            var Description=req.body.description; 

            rew.PointToBuy=PointToBuy;
            rew.ExpDate=ExpDate;
            rew.RankID=RankID;
            rew.ServiceID=ServiceID;
            rew.CreatedDate=Date.now();
            if(ValueDiscount!=null){
                rew.ValueDiscount=ValueDiscount;
            }
            if(PercentDiscount!=null){
                rew.PercentDiscount=PercentDiscount;
            }
            if(MinBillValue!=null){
                rew.MinBillValue=MinBillValue;
            }
            if(Description!=null){
                rew.Description=Description;
            }    
            var ck = ValidateReward(rew);
            if(ck.status!=true){
                res.json(ck);
                return;
            }   
            else{
                rew.save().then(s=>{
                    res.status(200).json({"status":true,"message":"Reward edit successfully!"});
                }).catch(err=>{
                    res.status(400).json({"status":false,"message":err});
                });  
            } 

        }
        else{
            res.json({"status":false,"message":"reward not found"});
        }
    });
});

function ValidateReward(reward){
    var ck={};
    if(reward.PointToBuy<0){
        ck.status=false;
        ck.message="Point must be >= 0"
        return ck
    }       
    // if(reward.ExpDate<Date.now())
    //     return next("Point must be >= 0");
    if(reward.ValueDiscount<0){
        ck.status=false;
        ck.message="ValueDiscount must be >= 0"
        return ck
    }
    
    if(reward.PercentDiscount<0){
        ck.status=false;
        ck.message="PercentDiscount must be >= 0"
        return ck
    }
    if(reward.MaxValueDiscount<0){
        ck.status=false;
        ck.message="MaxValueDiscount must be >= 0"
        return ck
    }         
    if(reward.MinBillValue<0)
    {
        ck.status=false;
        ck.message="MinBillValue must be >= 0"
        return ck
    } 
    
    if(reward.Description ==null || reward.Description=="")
    {
        ck.status=false;
        ck.message="Description is necessary"
        return ck
    }    
    var checkcode = ValidateCode(reward.Code);
    if(checkcode.status!=true){
        ck.status=false;
        ck.message=checkcode.message;
        return ck;
    }
    ck.status=true;
    ck.message="success";
    return ck;

}
function ValidateCode(Code){
  
    var checked={};
    const regSpecialChar=new RegExp(/[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]/);
    const regLowcase=new RegExp("(?=.*[a-z])");//Một chữ thường
    const regUpcase=new RegExp("(?=.*[A-Z])");//Mot chu in hoa
    const regNumber= new RegExp("(?=.*[0-9])");//Motso
    const regMinLengt = new RegExp("(?=.{6,10})");//>=6

    if(regSpecialChar.test(Code)){
        checked.status=false;
        checked.message="Không được dùng ký tự đặc biệt"
        return checked;
    }
    if(!regUpcase.test(Code)){
        checked.status=false;
        checked.message="Code phải là chữ in hoa"
        return checked;
    }
    if(regLowcase.test(Code)){
        checked.status=false;
        checked.message="Code không được dùng kí tự thường"
        return checked;
    }
    if(!regNumber.test(Code)){
        checked.status=false;
        checked.message="Code phải có ít nhất một số"
        return checked;
    }
    if(!regMinLengt.test(Code) || Code.length > 20){
        checked.status=false;
        checked.message="Code phải có độ dài từ 6-20 chữ cái";
        return checked;
    }
    checked.status=true;
    checked.message="Success";
    return checked;
}
module.exports = RewardRoute;
