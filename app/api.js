var express = require('express');
var User = require('./models/userModel');
var Referral = require('./models/referralCategoryModel');
var ReferralMaster = require('./models/referralMasterModel');
var DoctorMaster = require('./models/doctorModel');
var Appointment = require('./models/appointmentModel');
var TempPatient = require('./models/tempPatient');
var BillingService = require('./models/billingServiceModel');
var moment = require('moment');
var app = express();
var multer = require('multer');

module.exports = function(app) {
        var router = express.Router();
        router.route('/regpatients')
            .post(function(req, res) {
                //Create the registered Patient
                var patientsdata = req.body;
                var patient = new User(patientsdata);
              

                patient.save(function(err, patient) {                                       
                    if (err)
                        throw err;
                    res.send(patient);
                })
            })

            .get(function(req, res) {
                //Retrieve the Patient
                User.find({},{_id:1 , firstName:1, emailId:1, mobNumber : 1},function(err, User) {
                    
                    if (err) res.send({
                        error: err
                    });
                    res.json(User);

                });
            });

        router.route('/regpatient/:id')
            .get(function(req, res) {
                //Create the registered Patient by id
                var id = req.params.id;
                User.findById(id, function(err, User) {
                    if (err) res.send({
                        error: err
                    });
                    res.json(User);
                })
            })
            .put(function(req, res) {
                //Update the registered Patient by id
                var id = req.params.id;
                var patientUpdated = req.body;
                

                User.findOneAndUpdate({ _id: id }, patientUpdated, function(err, patientUpdated) {
                    if (err)
                        throw err;
                    res.send("Data Updated Successfully");
                });
            })
            .post(function(req, res) {
                //Update the registered Patient by id
                var id = req.params.id;
                User.findById(id, function(err, User) {
                    if (err) res.send({
                        error: err
                    });

                    User.patientId = req.body.patientId;
                    User.firstName = req.body.firstName;
                    User.lastName = req.body.lastName;

                    User.save(function(err, User) {
                        if (err) res.send({
                            error: err
                        });
                        res.json({
                            User: User
                        });
                    });
                })
            })
            .delete(function(req, res) {
                //Delete the registered Patient by id
                var id = req.params.id;
                User.findById(id, function(err, User) {
                    if (err) res.send({
                        error: err
                    });
                    User.remove({
                        _id: id
                    }, function(req, res) {
                        res.json({
                            User: User
                        })
                    })
                })
            })
            /*Registration Page Ends*/


        /*Referral Master*/
        /*Creating Referral Caegory*/
        router.route('/createReferralCateogry')
            .post(function(req, res) {
                var category = req.body.referralList;
                
                var referraldata = new Referral({
                    referralList: category
                });
                Referral.find({
                    'referralList': category
                }, function(err, result) {
                    if (result.length > 0) {
                        res.json({existData : 'Data Exists'})
                    } else {
                        referraldata.save(function(err, data) {
                            if (err) res.send({
                                error: err
                            }, "This creates error");
                            res.json({msg : 'Data Posted Successfully'});
                        })
                    }
                });
            })
            .get(function(req, res) {
                Referral.find(function(err, Referral) {
                    if (err) res.send({
                        error: err
                    });
                    res.json(Referral);

                });
            });

        /*CRUD Referrals*/
        router.route('/referrals')
            .post(function(req, res) {
                var referraldata = req.body;
                var name = req.body.name;
                var branch = req.body.branch;
                var type = req.body.referralType;
                var mobnumber = req.body.mobileNumber;


                var referalInfo = new ReferralMaster(referraldata);
                ReferralMaster.find({'name' : name, 'branch': branch, 'referralType' : type, 'mobileNumber' : mobnumber}, function(err, data){
                    if(data.length > 0){
                        res.json({existData : 'Data Exists'})
                    }
                    else {
                        referalInfo.save(function(err, referalInfo) {
                    if (err) res.send({
                        error: err
                    }, "This is an error");
                    res.json({msg : 'Data Posted Successfully' , ReferralMaster: referalInfo });
                })

                    }

                })


                
            })
            .get(function(req, res) {
                ReferralMaster.find(function(err, ReferralMaster) {
                    if (err) res.send({
                        error: err
                    });
                    res.send(ReferralMaster);
                })
            })

        router.route('/referral/:id')
            .get(function(req, res) {
                var id = req.params.id;
                ReferralMaster.findById(id, function(err, referralmaster) {
                    if (err) res.send({
                        error: err
                    });
                    res.json(referralmaster);
                })
            })
            .put(function(req, res) {
                //Update the registered Patient by id
                var id = req.params.id;
                var updatedreferral = req.body;

                ReferralMaster.findOneAndUpdate({ _id: id }, updatedreferral, function(err, updatedreferral) {
                    if (err)
                        throw err;
                    res.send("Data Updated Successfully");
                });
            })
            .delete(function(req, res) {
                //Delete the registered Patient by id
                var id = req.params.id;
                ReferralMaster.findById(id, function(err, referralmaster) {
                    if (err) res.send({
                        error: err
                    });

                    ReferralMaster.remove({
                        _id: id
                    }, function(err, req, res) {
                        if (err)
                            res.json({ error: err })

                    })
                })
            })

        router.route('/doctors')
            .post(function(req,res){
                var doctordata = req.body;
                // var docShift= req.body.shift.length;
                // for(i = 0 ; i< docShift ; i++){
                //     console.log(req.body.shift[i].workFrom);
                // }
                for(i = 0 ; i< doctordata.shift.length; i++){
                        //console.log(doctordata.shift[i].workFrom);
                        var timeFrom = new Date();
                        var workHrMins = doctordata.shift[i].workFrom.split(":");
                        timeFrom.setHours(parseInt(workHrMins[0]));
                        timeFrom.setMinutes(parseInt(workHrMins[1]));
                        timeFrom.setDate(01);
                        timeFrom.setMonth(01);
                        timeFrom.setYear(1970);
                        doctordata.shift[i].workFrom = timeFrom;
                        console.log("From :"+ doctordata.shift[i].workFrom)
                     // console.log("New Date:" + doc.shift[i].workFrom).toISOString();

                     //console.log(doctordata.shift[i].workTo);
                        var timeTo = new Date();
                        var workHrMins = doctordata.shift[i].workTo.split(":");
                        timeTo.setHours(parseInt(workHrMins[0]));
                        timeTo.setMinutes(parseInt(workHrMins[1]));
                        timeTo.setDate(01);
                        timeTo.setMonth(01);
                        timeTo.setYear(1970);
                        doctordata.shift[i].workTo = timeTo;
                }

                var doctorInfo = new DoctorMaster(doctordata);
                doctorInfo.save(function(err, doctorInfo){
                    if(err) 
                        throw err
                    res.json("Data Posted Successfully")
                })
            })

            
            .get(function(req,res){
                DoctorMaster.aggregate([{$unwind : "$shift"}, {$unwind : "$shift.workDay"}],function(err, DoctorMaster){
                    if(err)
                        throw err
                    res.send(DoctorMaster)
                })
            })

        router.route('/windedDoctors')
            .get(function(req,res){
                DoctorMaster.find(function(err, DoctorMaster){
                    if(err)
                        throw err
                    res.json(DoctorMaster);
                })
            })
        router.route('/doctor/:id')
            .get(function(req, res) {
                var id = req.params.id;
                DoctorMaster.findById(id, function(err, DoctorMaster) {
                    if (err) res.send({
                        error: err
                    });
                    res.json(DoctorMaster);
                })
            })
            .put(function(req,res){
                var id = req.params.id;
                var updateDoctor = req.body;
                for(i = 0 ; i< updateDoctor.shift.length; i++){
                        //console.log(doctordata.shift[i].workFrom);
                        var timeFrom = new Date();
                        var workHrMins = updateDoctor.shift[i].workFrom.split(":");
                        timeFrom.setHours(parseInt(workHrMins[0]));
                        timeFrom.setMinutes(parseInt(workHrMins[1]));
                        timeFrom.setDate(01);
                        timeFrom.setMonth(01);
                        timeFrom.setYear(1970);
                        updateDoctor.shift[i].workFrom = timeFrom;
                        console.log("From :"+ updateDoctor.shift[i].workFrom)
                     // console.log("New Date:" + doc.shift[i].workFrom).toISOString();

                     //console.log(doctordata.shift[i].workTo);
                        var timeTo = new Date();
                        var workHrMins = updateDoctor.shift[i].workTo.split(":");
                        timeTo.setHours(parseInt(workHrMins[0]));
                        timeTo.setMinutes(parseInt(workHrMins[1]));
                        timeTo.setDate(01);
                        timeTo.setMonth(01);
                        timeTo.setYear(1970);
                        updateDoctor.shift[i].workTo = timeTo;
                }
                

                DoctorMaster.findOneAndUpdate({ _id: id }, updateDoctor, function(err, updateDoctor) {
                    if (err)
                        throw err;
                    res.send("Data Updated Successfully");
                });

            })


        router.route('/appointment')
            .post(function(req, res) {
                var appointmentData = req.body;
                console.log(appointmentData);
                var appointments = new Appointment(appointmentData);

                appointments.save(function(err, appointment) {                                       
                    if (err)
                        throw err;
                    res.json(appointment);
                })
            })

            
            .get(function(req, res) {

                Appointment.find({})
                    .populate('patientId')
                    .populate('doctorId')
                    .populate('referralId')
                    
                    .exec(function(err, appointments) {
                    if (err) res.send({
                        error: err
                    });
                    res.send(appointments);
                })
            })

        router.route('/todayAppointment')
            .get(function(req, res){
                var startDate = moment().startOf('day');
                var endDate = moment().endOf('day');
                Appointment.find({'startTime' : {$gte : startDate, $lte : endDate}})
                    .populate('patientId')
                    .populate('doctorId')
                    .populate('referralId')
                    
                    .exec(function(err, appointments) {
                        console.log(appointments);
                    if (err) res.send({
                        error: err
                    });
                    res.send(appointments);
                })
            })


        router.route('/billingService')
            .post(function(req, res) {
                //console.log("Circular is " + billingCircularName);
                console.log("destination is " + filedestination);
                var billServiceData = req.body;   
                billServiceData.filePath = filedestination;
                var billService = new BillingService(billServiceData);
                
                //billServiceData.circular = billingCircularName;            
                billService.save(function(err, data) {
                    console.log(data);
                    if (err) 
                        throw err
                    res.json(data.department);
                });
            })     
            .get(function(req, res) {
                BillingService.find(function(err, billService) {
                    if (err) 
                        throw err
                    res.json(billService);

                });
            })

        var billingCircularName = "";
        var filedestination = "";
        var storage = multer.diskStorage({ //multers disk storage settings

            destination: function (req, file, cb) {
                filedestination = './uploads/';
                cb(null, filedestination)

            },
            filename: function (req, file, cb) {

                var datetimestamp = Date.now();
                billingCircularName = file.originalname.split('.')[file.originalname.split('.').length-2] + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
                cb(null, billingCircularName)
            }


        });


        var upload = multer({ //multer settings
                    storage: storage
                }).single('file');


        router.route('/upload')
            .post(function(req,res){

                upload(req,res,function(err){
                    if(err){
                        res.json({error_code:1,err_desc:err});
                             return;
                        }
                         res.json({error_code:0,err_desc:null});
                    })
            })


        router.route('*')
            .get(function(req, res) {
                res.redirect('/signin');
            })

        app.use('/api', router);
}

