var mongoose = require('mongoose');
var Schema = mongoose.Schema;



  var appointmentSchema = mongoose.Schema({
    patientId : { type: String, ref: 'User'},
    doctorId : { type: String, ref: 'Doctor'},
    referralId : { type: Schema.Types.ObjectId , ref: 'Referralmaster'},
    visitType : String,
    timeDuration : String,
    startTime : Date,
    endTime : Date,
    appointmentStatus : String
    
  });

 

  module.exports =  mongoose.model('Appointment', appointmentSchema);
