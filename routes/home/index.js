const express = require('express');
const app=express();
const router=express.Router();
const User=require('../../models/User');
const Video=require('../../models/videos');
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
