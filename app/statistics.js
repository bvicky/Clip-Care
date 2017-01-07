var express = require('express');
var User = require('./models/userModel');
var Referral = require('./models/referralCategoryModel');
var ReferralMaster = require('./models/referralMasterModel');
var DoctorMaster = require('./models/doctorModel');
var Appointment = require('./models/appointmentModel');
var TempPatient = require('./models/tempPatient');
var BillingServiceMaster = require('./models/billingServiceMasterModel');
var Billing = require('./models/billingModel');
var moment = require('moment');
var app = express();

module.exports = function(app) {
	var stat = express.Router();

	stat.route('/totalPatientsCount')
		.get(function(req, res){
			User.count({}, function(err, totalPatientsCount){
				res.json(totalPatientsCount);
			})
		})

	stat.route('/totalServiceCount')
		.get(function(req, res){
			BillingServiceMaster.count({},function(err, totalServiceCount){
				res.json(totalServiceCount);
			})
		})
	stat.route('/totalDoctorsCount')
		.get(function(req, res){
			DoctorMaster.count({},function(err, totalDoctorsCount){
				res.json(totalDoctorsCount);
			})
		})
		


	app.use('/statistics',stat);
}