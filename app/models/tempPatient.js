var mongoose = require('mongoose');
var counter = require('./counterModel');
var tempPatientSchema = mongoose.Schema({
	_id : String,
	prefix : String,
	firstName : String,
	middleName : String,
	lastName : String,
	dob : String,
	age : Number,
	gender : String,
	mobNumber : Number,
	emailId : String
});

tempPatientSchema.pre('save',function(next){
  var tempPatient = this;
  counter.findByIdAndUpdate({_id: 'tempPatientId'},{$inc: {seq: 1}},{ "upsert": true, "new": true },function(error, counter){
    if(error)
      return next(error);
    tempPatient._id = 'TEMBMSHT00' + counter.seq;
    console.log(tempPatient._id)
    next();
  });
});

module.exports =  mongoose.model('tempPatient', tempPatientSchema);