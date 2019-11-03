const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Gifts = new Schema({
    PointFrom:Number,
    Rank:ID,
    GiftCode:String,
    GiftQuantity:Number,
    PointToReward:Number,
    ExpDate:Date
},{
    collection: 'gift'
});

module.exports = mongoose.model('Gifts', Gifts);