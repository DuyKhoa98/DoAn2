const express=require('express');
const app = express();
const bodyParser=require('body-parser');
const config = require('./DB');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true,useUnifiedTopology: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const reward =require('./Controllers/RewardController')
app.use('/Reward',reward);


var Port=4000;
app.listen(Port, function(){
    console.log('Server is running on Port:',Port);
});
//#region Bỏ  

// app.get("/hello",urlencodedParser,(req,res)=>{
//     res.send("<h1>Getting Hello</h1>")
// });
// app.post("/hello",urlencodedParser,(req,res)=>{
//     res.send("<h1>Postting Hello</h1>")
// });

// const admin=require('./Routes/Admin.route')
// app.use('/Rank',admin);

// const policyRank=require('./Routes/PolicyRank.route')
// app.use('/Policy',policyRank);


// const policyPoint=require('./Routes/PolicyPoint.route')
// app.use('/Policy',policyPoint);

// const redemReward=require('./Routes/RedemReward.route')
// app.use('/Redem',redemReward);
//#endregion