const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let HistoryRedems = new Schema({
    UID:String,
    GiftType:Number,
    GiftID:Number,
    CreatedDate:Date,    
},{
    collection: 'historyRedem'
});

module.exports = mongoose.model('HistoryRedems', HistoryRedems);