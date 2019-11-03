const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Parameters = new Schema({
    ParaKey:String,
    Value:Number,
    Description:String,
},{
    collection: 'tbl_parameter'
});

module.exports = mongoose.model('Parameters', Parameters);