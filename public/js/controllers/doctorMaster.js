app.controller('doctorMasterController', function($scope, $http) {
    $scope.doctor = {};
    $scope.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.datetimepicker_options = { format: 'MM/DD/YYYY', useCurrent: false };
    $scope.timepicker_options = { format: 'HH:mm', useCurrent: false };
    $scope.doctor.current = {};

    $scope.docCurrentAddressLandMark = function() {
        var addrlength = $scope.doctor.current.landMark.length;
        var currAddrZipCodeParsed = isFinite($scope.doctor.current.landMark[addrlength - 1].long_name);
        if(addrlength == 8 || addrlength == 5){
            if (currAddrZipCodeParsed) {
                //console.log("Coming inside If loop");
                
                $scope.doctor.current.zipCode = $scope.doctor.current.landMark[addrlength - 1].long_name;
                $scope.doctor.current.country = $scope.doctor.current.landMark[addrlength - 2].long_name;
                $scope.doctor.current.state = $scope.doctor.current.landMark[addrlength - 3].long_name;
                $scope.doctor.current.city = $scope.doctor.current.landMark[addrlength - 5].long_name;
            } else {
                $scope.doctor.current.country = $scope.doctor.current.landMark[addrlength - 1].long_name;
                $scope.doctor.current.state = $scope.doctor.current.landMark[addrlength - 2].long_name;
                $scope.doctor.current.city = $scope.doctor.current.landMark[addrlength - 4].long_name;
            }
        }else{
            if (currAddrZipCodeParsed) {
                
                $scope.doctor.current.zipCode = $scope.doctor.current.landMark[addrlength - 1].long_name;
                $scope.doctor.current.country = $scope.doctor.current.landMark[addrlength - 2].long_name;
                $scope.doctor.current.state = $scope.doctor.current.landMark[addrlength - 3].long_name;
                $scope.doctor.current.city = $scope.doctor.current.landMark[addrlength - 6].long_name;
            } else {
                $scope.doctor.current.country = $scope.doctor.current.landMark[addrlength - 1].long_name;
                $scope.doctor.current.state = $scope.doctor.current.landMark[addrlength - 2].long_name;
                $scope.doctor.current.city = $scope.doctor.current.landMark[addrlength - 4].long_name;
            }
        }
    };

    $scope.docPermanentAddressLandMark = function() {
        var addrlength = $scope.doctor.permanent.landMark.length;
        var currAddrZipCodeParsed = isFinite($scope.doctor.permanent.landMark[addrlength - 1].long_name);
        if(addrlength == 8 || addrlength == 5){
            if (currAddrZipCodeParsed) {
                //console.log("Coming inside If loop");
                $scope.doctor.permanent.zipCode = $scope.doctor.permanent.landMark[addrlength - 1].long_name;
                $scope.doctor.permanent.country = $scope.doctor.permanent.landMark[addrlength - 2].long_name;
                $scope.doctor.permanent.state = $scope.doctor.permanent.landMark[addrlength - 3].long_name;
                $scope.doctor.permanent.city = $scope.doctor.permanent.landMark[addrlength - 5].long_name;
            } else {
                $scope.doctor.permanent.country = $scope.doctor.permanent.landMark[addrlength - 1].long_name;
                $scope.doctor.permanent.state = $scope.doctor.permanent.landMark[addrlength - 2].long_name;
                $scope.doctor.permanent.city = $scope.doctor.permanent.landMark[addrlength - 4].long_name;
            }
        }else{
            if (currAddrZipCodeParsed) {
                //console.log("Coming inside If loop");
                $scope.doctor.permanent.zipCode = $scope.doctor.permanent.landMark[addrlength - 1].long_name;
                $scope.doctor.permanent.country = $scope.doctor.permanent.landMark[addrlength - 2].long_name;
                $scope.doctor.permanent.state = $scope.doctor.permanent.landMark[addrlength - 3].long_name;
                $scope.doctor.permanent.city = $scope.doctor.permanent.landMark[addrlength - 6].long_name;
            } else {
                $scope.doctor.permanent.country = $scope.doctor.permanent.landMark[addrlength - 1].long_name;
                $scope.doctor.permanent.state = $scope.doctor.permanent.landMark[addrlength - 2].long_name;
                $scope.doctor.permanent.city = $scope.doctor.permanent.landMark[addrlength - 4].long_name;
            }
        }
    };

    $scope.docEmergencyAddressLandMark = function() {
        var addrlength = $scope.doctor.emergency.landMark.length;
        var currAddrZipCodeParsed = isFinite($scope.doctor.emergency.landMark[addrlength - 1].long_name);
        if(addrlength == 8 || addrlength == 5){
            if (currAddrZipCodeParsed) {
                //console.log("Coming inside If loop");
                $scope.doctor.emergency.zipCode = $scope.doctor.emergency.landMark[addrlength - 1].long_name;
                $scope.doctor.emergency.country = $scope.doctor.emergency.landMark[addrlength - 2].long_name;
                $scope.doctor.emergency.state = $scope.doctor.emergency.landMark[addrlength - 3].long_name;
                $scope.doctor.emergency.city = $scope.doctor.emergency.landMark[addrlength - 5].long_name;
            } else {
                emergency
                $scope.doctor.emergency.country = $scope.doctor.emergency.landMark[addrlength - 1].long_name;
                $scope.doctor.emergency.state = $scope.doctor.emergency.landMark[addrlength - 2].long_name;
                $scope.doctor.emergency.city = $scope.doctor.emergency.landMark[addrlength - 4].long_name;
            }
        }else{
            if (currAddrZipCodeParsed) {
                //console.log("Coming inside If loop");
                $scope.doctor.emergency.zipCode = $scope.doctor.emergency.landMark[addrlength - 1].long_name;
                $scope.doctor.emergency.country = $scope.doctor.emergency.landMark[addrlength - 2].long_name;
                $scope.doctor.emergency.state = $scope.doctor.emergency.landMark[addrlength - 3].long_name;
                $scope.doctor.emergency.city = $scope.doctor.emergency.landMark[addrlength - 6].long_name;
            } else {
                emergency
                $scope.doctor.emergency.country = $scope.doctor.emergency.landMark[addrlength - 1].long_name;
                $scope.doctor.emergency.state = $scope.doctor.emergency.landMark[addrlength - 2].long_name;
                $scope.doctor.emergency.city = $scope.doctor.emergency.landMark[addrlength - 4].long_name;
            }
        }
    };


    $scope.sameAddress = function() {
        var addrlength = $scope.doctor.current.landMark.length;
        var zipParsed = isFinite($scope.doctor.current.landMark[addrlength - 1].long_name);
        console.log(addrlength);
        if ($scope.doctor.sameCurrentaddress == false) {
            $scope.doctor.permanent = {};
        }
        if ($scope.doctor.sameCurrentaddress == true) {
           
            //$scope.doctor.current.landMark[0].long_name + " "+$scope.doctor.current.landMark[1].long_name + " "+ $scope.doctor.current.landMark[2].long_name + " "+$scope.doctor.current.landMark[3].long_name + " "+$scope.doctor.current.landMark[5].long_name + " "+$scope.doctor.current.landMark[6].long_name + " "+$scope.doctor.current.landMark[7].long_name + " "+ 
            $scope.doctor.permanent = angular.copy($scope.doctor.current);

            if(zipParsed){
                if(!angular.isString($scope.doctor.current.landMark)){
                    $scope.doctor.permanent.landMark = $scope.doctor.permanent.landMark[0].long_name + ", " + $scope.doctor.permanent.landMark[addrlength - 5].long_name + ", " + $scope.doctor.permanent.landMark[addrlength - 3].long_name + ", " + $scope.doctor.permanent.landMark[addrlength - 2].long_name;
                }
            }else{
                if(!angular.isString($scope.doctor.current.landMark)){
                    $scope.doctor.permanent.landMark = $scope.doctor.permanent.landMark[0].long_name + ", " + $scope.doctor.permanent.landMark[addrlength - 4].long_name + ", " + $scope.doctor.permanent.landMark[addrlength - 2].long_name;
                }

            }
            
        }
    };


    $scope.ageCalc = function() {
        console.log($scope.doctor.dob);
        var dob = new Date($scope.doctor.dob);
        var dobfullyear = dob.getFullYear();
        var todfullyear = new Date().getFullYear();
        $scope.doctor.age = todfullyear - dobfullyear;
    }
    $scope.doctor.shift =[];
    $scope.doctor.shift = [{
        workDay: "",
        workFrom: "",
        workTo: "",
        maxmaxSlots : "",
        strictSessionStatus: ""
    }];

    $scope.addWorkTime = function(index) {
        // add an element to the end of the array
        if (index == 0) $scope.doctor.shift.push({
            workDay: "",
            workFrom: "",
            workTo: "",
            maxSlots : "",
            strictSessionStatus: ""
        });
        else {
            $scope.doctor.shift.pop()
        }
    };

    $scope.calcMaxSlots = function(){
        for(i=0; i< $scope.doctor.shift.length; i++){
               
            var diff = moment.utc(moment($scope.doctor.shift[i].workTo,"HH:mm").diff(moment($scope.doctor.shift[i].workFrom,"HH:mm"))).format("HH:mm");
            console.log(diff);

            var calcMin =diff.split(":");
            hourtomin = parseInt(calcMin[0]*60)+ parseInt(calcMin[1]);
            console.log(parseInt(calcMin[0]*60));
            console.log(hourtomin);

            $scope.doctor.shift[i].maxSlots = hourtomin / parseInt($scope.doctor.sessionDuration);
            console.log($scope.doctor.shift[i].maxSlots);
        }
    }

    $scope.addDoctor = function() {

        
        var doctorId = $scope.doctor._id;
        var method = 'POST'
        var addEditDoctor = "/api/doctors"
        if (doctorId) { method = 'PUT', addEditDoctor = '/api/doctor/' + doctorId }
        $http({
            method: method,
            url: addEditDoctor,
            data: $scope.doctor
        }).success(function(data) {
            console.log(data)
        }).error(function(err) {
            console.log(err);
        })
    }

    $scope.getDoctors = function() {

        $http({
            method: 'GET',
            url: '/api/windedDoctors'
        }).success(function(data) {
            $scope.doctorsList = data;
        }).error(function(err) {
            console.log(err);
        })
    }

    $scope.editDoctor = function(id) {
        //console.log(id);
        $http({
            method: 'GET',
            url: '/api/doctor/' + id,
        }).success(function(data) {

            if (data != null) {
                $scope.doctor = data;

                var addrlength = $scope.doctor.current.landMark.length;
                
                var zipParsed = isFinite($scope.doctor.current.landMark[addrlength - 1].long_name);
                if (zipParsed) {
                    if(!angular.isString($scope.doctor.current.landMark)){
                        $scope.doctor.current.landMark = $scope.doctor.current.landMark[0].long_name + ", " + $scope.doctor.current.landMark[addrlength - 5].long_name + ", " + $scope.doctor.current.landMark[addrlength - 3].long_name + ", " + $scope.doctor.current.landMark[addrlength - 2].long_name;
                    }
                } else {
                    if(!angular.isString($scope.doctor.current.landMark)){
                        $scope.doctor.current.landMark = $scope.doctor.current.landMark[0].long_name  + ", " + $scope.doctor.current.landMark[addrlength - 4].long_name + ", " + $scope.doctor.current.landMark[addrlength - 2].long_name;
                    }
                }

                var addrlengthPermanent = $scope.doctor.permanent.landMark.length;
                var zipParsedPermanent = isFinite($scope.doctor.permanent.landMark[addrlengthPermanent - 1].long_name);
                if(zipParsedPermanent){
                    if(!angular.isString($scope.doctor.permanent.landMark)){

                        $scope.doctor.permanent.landMark = $scope.doctor.permanent.landMark[0].long_name + ", " + $scope.doctor.permanent.landMark[addrlengthPermanent - 5].long_name + ", " + $scope.doctor.permanent.landMark[addrlengthPermanent - 3].long_name + ", " + $scope.doctor.permanent.landMark[addrlengthPermanent - 2].long_name;
                    }
                }else{
                    if(!angular.isString($scope.doctor.permanent.landMark)){
                        $scope.doctor.permanent.landMark = $scope.doctor.permanent.landMark[0].long_name + ", " + $scope.doctor.permanent.landMark[addrlengthPermanent - 4].long_name + ", " + $scope.doctor.permanent.landMark[addrlengthPermanent - 2].long_name;
                    }

                }
                var addrlengthEmergency = $scope.doctor.emergency.landMark.length;
                var zipParsedEmergency = isFinite($scope.doctor.emergency.landMark[addrlengthEmergency - 1].long_name);
                
                if (zipParsedEmergency) {
                    if(!angular.isString($scope.doctor.emergency.landMark)){
                        $scope.doctor.emergency.landMark = $scope.doctor.emergency.landMark[0].long_name + ", " + $scope.doctor.emergency.landMark[addrlengthEmergency - 5].long_name + ", " + $scope.doctor.emergency.landMark[addrlengthEmergency - 3].long_name + ", " + $scope.doctor.emergency.landMark[addrlengthEmergency - 2].long_name;
                    }
                } else {
                    if(!angular.isString($scope.doctor.emergency.landMark)){
                        $scope.doctor.emergency.landMark = $scope.doctor.emergency.landMark[0].long_name  + ", " + $scope.doctor.emergency.landMark[addrlengthEmergency - 4].long_name + ", " + $scope.doctor.emergency.landMark[addrlengthEmergency - 2].long_name;
                    }
                }


                var dob = moment($scope.doctor.dob).format('MM/DD/YYYY');
                $scope.doctor.dob = dob;
                var doI = moment($scope.doctor.dateofIssue).format('MM/DD/YYYY');
                $scope.doctor.dateofIssue = doI;
                var doE = moment($scope.doctor.dateofExpiry).format('MM/DD/YYYY');
                $scope.doctor.dateofExpiry = doE;
                var doj = moment($scope.doctor.dateofJoining).format('MM/DD/YYYY');
                // console.log(doj);
                // console.log($scope.doctor);
                $scope.doctor.dateofJoining = doj;
                for (i = 0; i <= $scope.doctor.shift.length; i++) {
                    var timeFrom = moment($scope.doctor.shift[i].workFrom).format('HH:mm');
                    //console.log(timeFrom);
                    $scope.doctor.shift[i].workFrom = timeFrom;
                    //console.log($scope.doctor.shift[0].workFrom);

                    var timeTo = moment($scope.doctor.shift[i].workTo).format('HH:mm');
                    //console.log(timeTo);
                    $scope.doctor.shift[i].workTo = timeTo;
                    //console.log($scope.doctor.shift[0].workTo);


                }

                
            




            }
        }).error(function(err) {
            console.log(err);
        });
    };


    $scope.nexttab = function() {
        console.log('clicked');
        $('.doctortab > .active').next('li').find('a[data-toggle="tab"]').tab('show');

    }
    $scope.prevtab = function() {
        console.log('clicked');
        $('.doctortab > .active').prev('li').find('a[data-toggle="tab"]').tab('show');

    }
});