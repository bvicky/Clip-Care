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
    alternateContactNumber : Number,
    emailId : String,
    alternateEmailId : String,
    address : String,
    url : String,
    landMark : Object,
    city : String,
    state : String,
    country : String,
    zipCode : Number,
    isActive: {
        type: Boolean,
        default: true
    }
},{ versionKey: false });
module.exports =  mongoose.model('Referralmaster', referralMasterSchema);
