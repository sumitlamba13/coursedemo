const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const videoSchema=new Schema({
  topic:{
    type:String,
    required:true
  },
  subtopic:[{
    subtopicname:String,
    subtopicduration:String,
    subtopicurl:String
  }]
});

module.exports=mongoose.model('videos',videoSchema);
