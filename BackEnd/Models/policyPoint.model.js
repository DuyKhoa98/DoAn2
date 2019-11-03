const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PolicyPoints = new Schema({
    RankID:String,
    BonusPointByCash:Number,
    BonusPointByWallet:Number,
    CreatedDate:Date,
    CreatedBy:String
},{
    collection: 'policyPoint'
});

module.exports = mongoose.model('PolicyPoints', PolicyPoints);