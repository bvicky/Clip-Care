var mongoose = require('mongoose');
var counter = require('./counterModel');
var billingSchema  = mongoose.Schema({
	_id: String,
	patientId : { type: String, ref: 'User'},
    treatingDocName : String,
    referralName : String,
	billService : [{
		name : String,
		code : String,
		costPrice : Number,
		quantity : Number,
		discount : String,
		amount : Number
	}],
	total : Number,
	amountReceived : Number,
	amountReturned : Number,
	paymentMode : String
});

billingSchema.pre('save',function(next){
  var bill = this;
  counter.findByIdAndUpdate({_id: 'billId'},{$inc: {seq: 1}},{ "upsert": true, "new": true },function(error, counter){
    if(error)
      return next(error);
    bill._id = 'BMSHTBILL00' + counter.seq;
    console.log(bill._id);
    next();
  });
});


module.exports =  mongoose.model('billing', billingSchema);