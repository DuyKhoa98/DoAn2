const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PolicyRewards = new Schema({
    Name:String,
    CreatedDate:Date,
    Description:String,
},{
    collection: 'policyReward'
});

module.exports = mongoose.model('PolicyRewards', PolicyRewards);