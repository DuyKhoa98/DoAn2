const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserDatas = new Schema({
    UID:String,
    RankID:Number,
    Point:Number,
    CreatedDate:Date,
    CreatedBy:String,
    ModifiedDate:Date,
    ModifiedBy:String
},{
    collection: 'userData'
});

module.exports = mongoose.model('UserDatas', UserDatas);