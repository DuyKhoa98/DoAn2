const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let HistoryRedems = new Schema({
    UID:String,
    RewardID:String,
    ModifiedDate:String,
},{
    collection: 'tbl_historyRedem'
});

module.exports = mongoose.model('HistoryRedems', HistoryRedems);