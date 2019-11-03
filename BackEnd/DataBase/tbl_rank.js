const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Ranks = new Schema({
    RankName:String,
    RankValue:Number
},{
    collection: 'tbl_rank'
});

module.exports = mongoose.model('Ranks', Ranks);