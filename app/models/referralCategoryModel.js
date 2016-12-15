var mongoose = require('mongoose');

var referralSchema = mongoose.Schema({
  referralList : String
},{ versionKey: false });

module.exports =  mongoose.model('Referral', referralSchema);
