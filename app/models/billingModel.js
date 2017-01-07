var mongoose = require('mongoose');
var counter = require('./counterModel');
var billingSchema  = mongoose.Schema({
	_id: String,
	patientId : String, 
	treatingDocName : String,
    billDate : Date,
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
	amountBalance : Number,
	paymentMode : String
});

billingSchema.pre('save',function(next){
  var bill = this;
  counter.findByIdAndUpdate({_id: 'billId'},{$inc: {seq: 1}},{ "upsert": true, "new": true },function(error, counter){
    if(error)
      return next(error);
  	if(bill.total == bill.amountReceived){
  		bill._id = 'F'+bill.patientId + counter.seq;
  	}else{
  		bill._id = 'A'+bill.patientId+ counter.seq;
  	}
    
    console.log(bill._id);
    next();
  });
});


module.exports =  mongoose.model('billing', billingSchema);