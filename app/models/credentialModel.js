var mongoose = require('mongoose');

var credentialSchema = mongoose.Schema({
  userId : String,
  password : String,
  role : String
},{ versionKey: false });

module.exports =  mongoose.model('Credential', credentialSchema);
