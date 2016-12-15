var mongoose = require('mongoose');
var counter = require('./counterModel');
var userSchema = mongoose.Schema({
  _id : String,
  prefix : String,
  firstName : String,
  middleName : String,
  lastName : String,
  dob : String,
  age : Number,
  gender : String,
  isMinor: {
        type: Boolean,
        default: false
  },

  parent:{
    patientRelation : String,
    prefix : String,
    firstName : String,
    middleName : String,
    lastName : String,
    mobNumber : Number,
    alternateMobNumber : Number,
    emailId : String,
    alternateEmailId : String
  },
  mobNumber : Number,
  alternateMobNumber : Number,
  landline : Number,
  alternateLandline : Number,
  emailId : String,
  alternateEmailId : String,    
  current:{
    address : String,
    landMark : String,
    city : String,
    state: String,
    country : String,
    zipCode : Number
  },
  sameCurrentaddress :{
      type: Boolean,
      default: false
  },
  permanent:{
    address : String,
    landMark : String,
    city : String,
    state: String,
    country : String,
    zipCode : Number
  },
  paymentmethod : String,
  
});

userSchema.pre('save',function(next){
  var user = this;
  counter.findByIdAndUpdate({_id: 'userId'},{$inc: {seq: 1}},{ "upsert": true, "new": true },function(error, counter){
    if(error)
      return next(error);
    user._id = 'BMSHT00' + counter.seq;
    console.log(user._id)
    next();
  });
});

module.exports =  mongoose.model('User', userSchema);