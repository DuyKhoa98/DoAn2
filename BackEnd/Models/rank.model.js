const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Ranks = new Schema({
    RankName:Number,
    CreatedDate:Date,
},{
    collection: 'rank'
});

module.exports = mongoose.model('Ranks', Ranks);