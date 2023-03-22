const mongoose = require('mongoose');

let ShowSchema = mongoose.Schema({
  title:{
      type:String,
      required:true
  },
  artist:{
      type:String,
      required:true
  },
  date:{
    type:[Number],
    required:true
  },
  time:{
    type:String,
    required:true
  },
  genre:{
    type:String,
    required:true
  },
  runtime:{
    type:Number,
    required:true
  }, 
  venue:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },

});

module.exports = mongoose.model('Show', ShowSchema);