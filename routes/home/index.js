const express = require('express');
const app=express();
const router=express.Router();
const User=require('../../models/User');
const Video=require('../../models/Videos');
const insta = require('instamojo-nodejs');
router.all('/*',(req,res,next)=>{
  req.app.locals.layout='home';
  next();
});

router.get('/',(req,res)=>{
  res.render('index');
});

router.get('/enroll',(req,res)=>{
  res.render('enroll');
});

router.get('/payment',(req,res)=>{
  res.render('payment');
});


router.post('/payment',(req,res)=>{
  Insta.setKeys(test_1249dcff7683c9c6d1306d44abc, test_3ce3ebf8ce7cb814588a0ca472b);
  var data = new Insta.PaymentData();
  Insta.isSandboxMode(true);
  data.purpose=req.body.purpose;
  data.amount=req.body.amount;
  data.buyer_name=req.body.buyer_name;
  data.redirect_url=req.body.redirect_url;
  data.email=req.body.email;
  data.phone=req.body.phone;
  data.send_mail=false;
  data.webhook='http://www.example.com/webhook';
  data.send_sms=false;
  data.allow_repeated_payments=false;
  Insta.createPayment(data, function(error, response) {
    if (error) {
      // some error
    } else {
      // Payment redirection link at response.payment_request.longurl
      console.log(response);
      const reponse_data=JSON.parse(response);
      const redirectUrl=reponse_data.payment_request.longurl;
      res.status(200).json(redirectUrl);
    }
  });
});

router.get('/enroll/videos',(req,res)=>{
  Video.find({}).then(video=>{
    console.log(video);
    res.render('videos',{video:video});
  });
});

router.get('/enroll/videos/:section/:id',(req,res)=>{
  //console.log(req.params.section);
   Video.findOne({topic:req.params.section}).then(video=>{
     //console.log(video);
     res.render('playvideo',{url:video.subtopic[req.params.id].subtopicurl,name:video.subtopic[req.params.id].subtopicname});
   }).catch(err=>console.log(err));
});

router.post('/',(req,res)=>{
  const newUser=new User();
  newUser.name=req.body.name;
  newUser.email=req.body.email;
  newUser.mobileno=req.body.mobileno;
  let errors=[];
  if (!req.body.name) {
    errors.push({message:'Please enter usernam name'});
  }
  if(!req.body.email){
    errors.push({message:'Please enter email'});
  }
  if(!req.body.mobileno){
    errors.push({message:'Please enter mobileno'});
  }
  if(errors.length>0){
    console.log(errors);
  }else{
    newUser.save().then(savedUser=>{
      console.log(savedUser);
      res.render('payment',{user:savedUser});
    });
  }
});
module.exports=router;
