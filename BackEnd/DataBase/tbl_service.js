const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Services = new Schema({
    ServiceName:String
},{
    collection: 'tbl_service'
});

module.exports = mongoose.model('Services', Services);