app.controller('appointmentDashboardController', function($scope, $http, $sce, uiCalendarConfig) {
    $scope.patient = {};
    $scope.appointment ={};
    $scope.events = [];
    var maxDate = moment().format('MM/DD/YYYY');
    $scope.datetimepicker_options = { format: 'MM/DD/YYYY', maxDate: maxDate };
    $scope.timepicker_options = { format: 'HH:mm', useCurrent: false };

     $scope.ageCalc = function() {
        $scope.patient.isMinor = false;
        console.log($scope.patient.dob);
        var dob = new Date($scope.patient.dob);
        var dobfullyear = dob.getFullYear();
        var todfullyear = new Date().getFullYear();
        $scope.patient.age = todfullyear - dobfullyear;
        if ($scope.patient.age < 15) {
            $scope.patient.isMinor = true;
        } else {
            $scope.patient.isMinor = false;
        }
    };

    $scope.dobCalc = function() {
        var age = $scope.patient.age;
        var fullyear = new Date().getFullYear();
        var year = fullyear - age;
        var agedob = "01/01/" + year;
        $scope.patient.dob = agedob;
        console.log($scope.patient.dob);
        console.log($scope.patient.age);
        if (age < 15) {
            $scope.patient.isMinor = true;
        } else {
            $scope.patient.isMinor = false;
        }

    };

    $scope.actualWeek = function() {
        $scope.currentWeek = [];
        //  console.log(moment().startOf('isoWeek'));
        $scope.viewWeekStart = moment().startOf('isoWeek');
        $scope.viewWeekEnd = moment().endOf('isoWeek');
        for (var curDay = $scope.viewWeekStart; curDay <= $scope.viewWeekEnd; curDay.add(1, 'days')) {
            $scope.currentWeek.push(curDay.clone().toDate());
        }
    }



    $scope.nextWeek = function() {
        //console.log("act" + dates);
        // $scope.currentWeek.add(1,'weeks');
        $scope.currentWeek = [];
        // $scope.viewWeekStart.add(1,'weeks');

        $scope.viewWeekEnd.add(1, 'weeks');
        for (var curDay = $scope.viewWeekStart; curDay <= $scope.viewWeekEnd; curDay.add(1, 'days')) {
            $scope.currentWeek.push(curDay.clone().toDate());
        }

        //console.log( $scope.currentWeek)   ;

    }

    $scope.prevWeek = function() {
        $scope.currentWeek = [];
        $scope.viewWeekStart.add(-2, 'weeks');
        $scope.viewWeekEnd.add(-1, 'weeks');
        for (var curDay = $scope.viewWeekStart; curDay <= $scope.viewWeekEnd; curDay.add(1, 'days'))
            $scope.currentWeek.push(curDay.clone().toDate());


    }


    $scope.savePatient = function(){
        
        $http({
            method: 'POST',
            url: "/api/regpatients",
            data : $scope.patient
        }).success(function(data) {
            console.log(data);
            $scope.patient._id = data._id;
        }).error(function(err) {
            console.log(err);
        });


    };

    $scope.fetchPatientRecord = function() {
        $http({
            method: 'GET',
            url: "/api/regpatients"
        }).success(function(data) {
            $scope.patientData = data;
            console.log($scope.patientData);
        }).error(function(err) {
            console.log(err);
        });
    };

  

    $scope.viewPatientRecord = function(id) {
        $scope.datafilter ="";
        console.log('clicked');
        console.log(id);
        $http({
            method: 'GET',
            url: '/api/regpatient/' + id
        }).success(function(data) {
            $scope.patient = data;
            console.log(data);
        }).error(function(err) {
            console.log(err);
        })

    }

    $scope.fetchReferralRecord = function() {

        $http({
            method: 'GET',
            url: "/api/referrals"
        }).success(function(data) {
            //console.log(data)
            $scope.referredlist = data;

        }).error(function(err) {
            console.log(err);
        });
    };

    $scope.viewReferralRecord = function(id) {
        $scope.datafilter ="";
        console.log('clicked');
        console.log(id);
        $http({
            method: 'GET',
            url: '/api/referral/' + id
        }).success(function(data) {
            $scope.referral = data;
            console.log(data);
        }).error(function(err) {
            console.log(err);
        })
    };


    $scope.getDoctorsDashboardList = function() {

        $http({
            method: 'GET',
            url: '/api/doctors'
        }).success(function(data) {
            $scope.doctorsList = data;
            $scope.workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.appCal = {};
            $scope.docList = {};
            //console.log($scope.appCal);
            $.each(data, function(i, docInfo) {
                //console.log(docInfo);
                var docShift = docInfo.shift;
                //console.log(docShift);
                if (!$scope.appCal[docInfo._id]) {

                    $scope.appCal[docInfo._id] = {};
                    //console.log($scope.appCal[docInfo._id]);
                }

                if (!$scope.appCal[docInfo._id][docShift.workDay]) $scope.appCal[docInfo._id][docShift.workDay] = [];
                $scope.appCal[docInfo._id][docShift.workDay].push(docShift);
                $scope.docList[docInfo._id] = docInfo;

                //console.log($scope.docList[docInfo._id]);
            });
            // console.log($scope.appCal);
            // console.log($scope.docList);

        }).error(function(err) {
            console.log(err);
        })
    };


    //var minDocTime = "" ;

    $scope.appointmentDash = function(){
        $('#appointmentDash').css('display','block');
        $('#Cal').css('display','none');
    }
    
    $scope.docName = "";
    $scope.docTimeFrom = "";
    $scope.docTimeTo = "";
    $scope.todayDate = moment().format('MM/DD/YYYY');
    $scope.maxAppointmentDate = moment().add(7,'days').format('MM/DD/YYY');
    
    $scope.docTime = function(from, to, name, id, workDay, maxSlots) {
        $scope.minDocTime = from;
        $scope.maxDoctime = to;
        $scope.docName = name;
        $scope.docId = id;
        $scope.maxSlots = maxSlots;
        $scope.docTimeFrom = moment($scope.minDocTime).format('hh:mm a');
        $scope.docTimeTo = moment($scope.maxDoctime).format('hh:mm a');
        $scope.docWorkDay = workDay;

        for(i=0; i<7 ;i++){
            if($scope.docWorkDay == moment($scope.currentWeek[i]).format('dddd')){                
                $scope.docDate = moment($scope.currentWeek[i]).format('dddd, MMM DD, YYYY') ;
                $scope.appDate = moment($scope.currentWeek[i]); 
                $scope.checkDate = moment($scope.currentWeek[i]).format('MM/DD/YYYY');
                
                if($scope.checkDate < $scope.todayDate){
                    alert('Selected Dates is Less than Current Date');
                }
                else if($scope.checkDate > $scope.maxAppointmentDate){
                    alert('Sorry');

                }
                else{

                    $('#Cal').css('display','block');
                    $('#appointmentDash').css('display','none');
                    

                    if($scope.sessionStatus == true){
                            $scope.uiConfig = {

                                calendar: {
                                //events : $scope.events,
                                defaultView: 'agendaDay',
                                defaultDate : $scope.appDate,
                                //gotoDate : $scope.viewDate,
                                minTime: moment($scope.minDocTime).format('HH:mm'),
                                maxTime: "24:00:00",
                                editable: true,
                                height: 500,
                                header: {
                                    left: '',
                                    center: 'title',
                                    right: 'agendaDay listDay'
                                },
                                slotDuration: '00:15:00',
                                slotInterval: '00:15:00',
                                slotLabelInterval : '00:15:00',
                                slotLabelFormat: 'hh:mm a',
                                selectable : true,
                                editable : true,
                                eventLimit : true,
                                selectHelper : true,
                                allDaySlot : false,
                                editable  : true,
                                eventOverlap  : false,
                                dayClick : $scope.dispView,
                                eventClick : $scope.editEvent
                            }
                        };
                        
                    }
                    
                    else{

                        $scope.uiConfig = {

                            calendar: {
                            //events : $scope.events,
                            defaultView: 'agendaDay',
                            defaultDate : $scope.appDate,
                            //gotoDate : $scope.viewDate,
                            minTime: moment($scope.minDocTime).format('HH:mm'),
                            maxTime: moment($scope.maxDoctime).format('HH:mm'),
                            editable: true,
                            height: 500,
                            header: {
                                left: '',
                                center: 'title',
                                right: 'agendaDay listDay'
                            },
                            slotDuration: '00:15:00',
                            slotInterval: '00:15:00',
                            slotLabelInterval : '00:15:00',
                            slotLabelFormat: 'hh:mm a',
                            selectable : true,
                            editable : true,
                            eventLimit : true,
                            selectHelper : true,
                            editable  : true,
                            allDaySlot : false,
                            eventOverlap  : false,
                            dayClick : $scope.dispView,
                            eventClick : $scope.editEvent

                            }
                        };

                    }

                    
                }
            }
        }

        
    };

    $scope.startTime = "";
    $scope.dispView = function(date, jsevent, view){
        if($scope.patient._id == null){
            alert("Please Select the Patient")
        }
        else if($scope.appointment.visitType == null){
            alert("Please Select the Appointment Type")
        }
        else{
            $scope.startTime = date;
            $('#myModal').modal('show');
        }
        
        //uiCalendarConfig.calendars['calendar'].fullCalendar( 'default', $scope.docDate );
    }

    $scope.eventClick = function(){
        console.log(clicked);
        alert($scope.events + ' was clicked ');
    }

    $scope.availableSlots = "";
    $scope.saveAppointment = function(duration){   
        
        $scope.events.push({
            title: 'Patient Name : '+ $scope.patient.firstName+'\t '+' || '+ 'Age :' +$scope.patient.age+'\t '+' || '+' Gender : ' + $scope.patient.gender +'\t '+' || '+ 'Email Id : ' + $scope.patient.emailId +'\n Appointment Type : '+ $scope.appointment.visitType +'\n Doctor Name : ' + $scope.docName,
            start: $scope.startTime,
            end: $scope.startTime+ parseInt(duration),
            stick : true,
        });
             

        
        $('#myModal').modal('hide');  
        
        $scope.appointment.patientId = $scope.patient._id;
        $scope.appointment.doctorId = $scope.docId;
        $scope.appointment.referralId = $scope.referral._id;
        $scope.appointment.appointmentStatus = "Booked";
        for(i=0;i<$scope.events.length;i++){
            $scope.appointment.startTime = $scope.events[i].start;
            $scope.appointment.endTime = $scope.events[i].end;
        }

        $http({
            method : 'POST',
            url : '/api/appointment',
            data : $scope.appointment
        }).success(function(data) {
            $scope.appointmentData = data;
            console.log($scope.appointmentData);

        }).error(function(err) {
            console.log(err);
        }); 

        
        //console.log($scope.appointment.eventSources)     
    }

    $scope.appointment.eventSources = [$scope.events];
    
    $scope.fetchAppointments = function(){

            console.log('clicked Doc Id :'+ $scope.docId)
            $http({
                method : 'GET',
                url : '/api/appointment'
            }).success(function(data) {
                $scope.appointmentInfo = data;
                // console.log(data);
                
                    for(i=0; i<$scope.appointmentInfo.length; i++){
                        $scope.appointmentInfo[i].referralId = {};                        
                        
                        if($scope.docId == $scope.appointmentInfo[i].doctorId._id){
                            
                            if($scope.appointmentInfo[i].visitType == 'On-Call'){
                                $scope.events.push({
                                    title: 'Patient ID : ' +$scope.appointmentInfo[i].patientId._id +" "+'Patient Name : '+$scope.appointmentInfo[i].patientId.firstName + " " +$scope.appointmentInfo[i].patientId.lastName + " " +"Patient Mobile Number : "+$scope.appointmentInfo[i].patientId.mobNumber + " "+"Patient E-mail Id : " +$scope.appointmentInfo[i].patientId.emailId +"\n "+ "Appointment Type: "+ $scope.appointmentInfo[i].visitType +"\n "+"Doctor Name : " +$scope.appointmentInfo[i].doctorId.firstName + " "+$scope.appointmentInfo[i].doctorId.lastName + "  "+ "Referred By : "+ $scope.appointmentInfo[i].referralId.name  ,
                                    start : $scope.appointmentInfo[i].startTime,
                                    end : $scope.appointmentInfo[i].endTime,
                                    backgroundColor : "red"
                                })
                            }else{
                                $scope.events.push({
                                    title: 'Patient ID : ' +$scope.appointmentInfo[i].patientId._id +" "+'Patient Name : '+$scope.appointmentInfo[i].patientId.firstName + " " +$scope.appointmentInfo[i].patientId.lastName + " " +"Patient Mobile Number : "+$scope.appointmentInfo[i].patientId.mobNumber + " "+"Patient E-mail Id : " +$scope.appointmentInfo[i].patientId.emailId + "\n "+"Doctor Name : " +$scope.appointmentInfo[i].doctorId.firstName + " "+$scope.appointmentInfo[i].doctorId.lastName + "  "+ "Referred By : "+ $scope.appointmentInfo[i].referralId.name  ,
                                    start : $scope.appointmentInfo[i].startTime,
                                    end : $scope.appointmentInfo[i].endTime,
                                    backgroundColor : "blue"
                                })
                            }
                            uiCalendarConfig.calendars['calendar'].fullCalendar('removeEvents');
                        }else{
                            uiCalendarConfig.calendars['calendar'].fullCalendar('removeEvents');
                        }
                    }                
            }).error(function(err) {
                console.log(err);
            });
        $scope.events.pop();
        
    }

    $scope.editDocTime = function(docId){
        $scope.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        console.log(docId);
        $http({
            method: 'GET',
            url: '/api/doctor/'+docId
        }).success(function(data) {
            $scope.doctor = data;
            console.log($scope.doctor.shift.length);
            for (var i = 0; i <= $scope.doctor.shift.length; i++) {
                var timeFrom = moment($scope.doctor.shift[i].workFrom).format('HH:mm');                   
                $scope.doctor.shift[i].workFrom = timeFrom;
                console.log('timeFrom :' + $scope.doctor.shift[i].workFrom );
                var timeTo = moment($scope.doctor.shift[i].workTo).format('HH:mm');
                $scope.doctor.shift[i].workTo = timeTo;
            }

        }).error(function(err) {
            console.log(err);
        });
        
        

    }




    /*Referral Information*/

    $scope.referral = {};
    var contactInfo = {
        personName: "",
        designation: "",
        mobileNumber: ""
    };
    $scope.referral.contactPersons = [contactInfo];

    $scope.addRemoveContactPerson = function(index) {
        if (index == 0) $scope.referral.contactPersons.push({
            personName: "",
            designation: "",
            mobileNumber: ""
        })
        else {
            $scope.referral.contactPersons.pop();
        }
    };


    $scope.addreferral = function(addReferralForm) {
        
        $http({
            method: "POST",
            url: "/api/referrals",
            data: $scope.referral
        }).success(function(data) {
            console.log(addReferralForm);
            addReferralForm.$setPristine();
            addReferralForm.$setUntouched();
            $scope.fetchReferralRecord();
            $scope.message = data;
          
        }).error(function(err) {
            console.log(err);
        });
    };

    $scope.categories = function() {
        $http({
            method: 'GET',
            url: "/api/createReferralCateogry"
        }).success(function(data) {
            $scope.categoriesList = data;
        }).error(function(err) {
            console.log(err);
        });
    };


});