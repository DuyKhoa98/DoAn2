const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PolicyPoints = new Schema({
    RankID:String,
    BonusByCash:Number,
    BonusByWallet:Number,
    ServiceID:String
},{
    collection: 'tbl_policyPoint'
});

module.exports = mongoose.model('PolicyPoints', PolicyPoints);