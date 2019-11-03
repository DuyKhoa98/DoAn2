const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let RankUsers = new Schema({
    UID:String,
    RankID:Number,
    RankName:Number,
    CreatedDate:Date,
    CreatedBy:String,
},{
    collection: 'rankUser'
});

module.exports = mongoose.model('RankUsers', RankUsers);