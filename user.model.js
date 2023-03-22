const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  name:{
    type:String,
    required:true
  },
  surname:{
    type:String,
    required:true
  },
  admin:{
    type:Boolean,
    required:true
  },
  bookmarkedShows: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Show',
    default: [],
  },
});

module.exports = mongoose.model('User', UserSchema);