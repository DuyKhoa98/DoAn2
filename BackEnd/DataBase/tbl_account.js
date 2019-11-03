const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Accounts = new Schema({
    UserID:String,
    Point:Number,
    RankID:Number,
    ModifiedDate:Date
},{
    collection: 'tbl_account'
});

module.exports = mongoose.model('Accounts', Accounts);