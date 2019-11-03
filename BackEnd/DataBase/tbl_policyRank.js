const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PolicyRanks = new Schema({
   PointFrom:Number,
   PointTo:Number,
   RankID:String,
},{
    collection: 'tbl_policyRank'
});

module.exports = mongoose.model('PolicyRanks', PolicyRanks);