const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PolicyRanks = new Schema({
    PointFrom:Number,
    RankID:String,
    Description:String,
    CreatedDate:Date,
    CreatedBy:String
},{
    collection: 'policyRank'
});

module.exports = mongoose.model('PolicyRanks', PolicyRanks);