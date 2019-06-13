const express = require('express');
const app=express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.Promise=global.Promise;


mongoose.connect('mongodb://test:testapp2@ds235417.mlab.com:35417/eckovation');

//using static
app.use(express.static(path.join(__dirname,'public')));

//set view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//set body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//requiring routes
const home=require('./routes/home/index');

//using routes
app.use('/',home);

const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
  console.log("listening to port",PORT);
});
