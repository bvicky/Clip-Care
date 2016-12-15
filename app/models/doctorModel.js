var mongoose = require('mongoose');
var counter = require('./counterModel');
var doctorSchema = mongoose.Schema({
	_id: String,
  prefix : String,
  firstName : String,
  middleName : String,
  lastName : String,
  dob : Date,
  age : Number,
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
    zipCode : String
  },
  permanent:{
    address : String,
    landMark : String,
    city : String,
    state: String,
    country : String,
    zipCode : String
  },
  emergency:{
    contactName: String,
    contactRelation : String,
    mobNumber : Number,
    alternateMobNumber : Number,
    landline : Number,
    alternateLandline : Number,
    emailId : String,
    alternateEmailId : String,
    address : String,
    landMark : String,
    city : String,
    state: String,
    country : String,
    zipCode : String
  },
  qualification : String,
  specialization : String,
  designation : String,
  departmentId  : String,
  dateofJoining : Date,
  experience : String,
  stateMedicalRegNumber : String,
  countryMedicalRegNumber : String,
  otherMedicalRegNumber : String,
  medicoLegalInsurance: String,
  sumAssured : Number,
  dateofIssue : Date,
  dateofExpiry : Date,
  sessionDuration : String,
  shift : [{
    workDay : [String] ,
    workFrom: Date,
    workTo: Date,
    maxSlots : Number,
    strictSessionStatus: {
        type: Boolean,
        default: false
    }
    
  }]
});

doctorSchema.pre('save',function(next){
  var doc = this;
  counter.findByIdAndUpdate({_id: 'docId'},{$inc: {seq: 1}},{ "upsert": true, "new": true },function(error, counter){
    if(error)
      return next(error);
    doc._id = 'BMSHTDOC' + counter.seq;
    console.log(doc._id)
    next();
  });
});


module.exports =  mongoose.model('Doctor', doctorSchema);