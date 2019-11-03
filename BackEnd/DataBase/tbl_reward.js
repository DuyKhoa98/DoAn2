const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Rewards = new Schema({
    Code:String,
    PointToBuy:Number,
    ExpDate:Date,
    RankID:Number,
    ServiceID:String,
    ValueDiscount:{type:Number,default:0},
    PercentDiscount:{type:Number,default:0},
    MaxValueDiscount:{type:Number,default:0},
    MinBillValue:Number,
    Description:String,
    CreatedDate:Date
},{
    versionKey: false,
    collection: 'tbl_reward'
});

module.exports = mongoose.model('Rewards', Rewards);