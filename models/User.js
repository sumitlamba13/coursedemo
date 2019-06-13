const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
  name:{
    type:String,
    requied:true
  },
  email:{
    type:String,
    required:true
  },
  mobileno:{
    type:String,
    required:true
  },
  profileimage:{
    type:String
  }
});
module.exports=mongoose.model('users',userSchema)
