var mongoose = require('mongoose');

var referralMasterSchema = mongoose.Schema({
  referralType : String,
    prefix : String,
    name : String,
    branch :String,
    contactPersons :[ {
      personName : String,
      designation : String,
      mobileNumber : Number
    }],
    mobileNumber : Number,
    landline : Number,
    emailId : String,
    alternateEmailId : String,
    address : String,
    url : String,
    landMark : String,
    city : String,
    state : String,
    country : String,
    pinCode : Number,
    isActive: {
        type: Boolean,
        default: true
    }
},{ versionKey: false });
module.exports =  mongoose.model('Referralmaster', referralMasterSchema);
