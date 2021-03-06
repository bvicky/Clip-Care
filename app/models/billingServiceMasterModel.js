var mongoose = require('mongoose');

var billingMasterServiceSchema = mongoose.Schema({
  department : String,
  code : String,
  name : String,
  acronym : String,
  amount : Number,
  ABC : Number,
  costPrice : Number,
  effectiveFrom : Date,
  circular : String,
  filePath : String

});
module.exports =  mongoose.model('Billingservice', billingMasterServiceSchema);
