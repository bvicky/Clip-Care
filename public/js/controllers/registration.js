app.controller("registrationController", function($scope, $http, $location, $routeParams, $filter) {
    // console.log( Date.now())

    $scope.pageSize = 5;
    $scope.currentPage = 1;
    $scope.sortType = '_id'; // set the default sort type
    $scope.sortReverse = false;
    var maxDate = moment().format('MM/DD/YYYY');
    $scope.patient = {};
    $scope.patient.hospitalLocation = "Bangalore";
    $scope.patient.hospitalName = "BMS Hospital Trust";
    $scope.patient.hospitalBranch = "Basavangudi";
    $scope.datetimepicker_options = { format: 'MM/DD/YYYY', maxDate: maxDate };
    $scope.patient.current = {};
    $scope.patient.permanent = {};

    $scope.resetdetails = function(registrationform) {
        console.log('clicked');
        $scope.patient = {};
        registrationform.$setUntouched();
        registrationform.$setPristine();

    }

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
    $scope.patient.current.landMark = "";

    $scope.currentAddressLandMark = function() {
        var addrlength = $scope.patient.current.landMark.length;
        var currAddrZipCodeParsed = isFinite($scope.patient.current.landMark[addrlength - 1].long_name);
        if(addrlength == 8 || addrlength == 5){
            if (currAddrZipCodeParsed) {
            
                $scope.patient.current.zipCode = $scope.patient.current.landMark[addrlength - 1].long_name;
                $scope.patient.current.country = $scope.patient.current.landMark[addrlength - 2].long_name;
                $scope.patient.current.state = $scope.patient.current.landMark[addrlength - 3].long_name;
                $scope.patient.current.city = $scope.patient.current.landMark[addrlength - 5].long_name;
                // $scope.patient.current.landMark = $scope.patient.current.landMark[0].long_name + ", " + $scope.patient.current.landMark[addrlength - 5].long_name + ", " + $scope.patient.current.landMark[addrlength - 3].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;
            } else {
                $scope.patient.current.zipCode = "";
                $scope.patient.current.country = $scope.patient.current.landMark[addrlength - 1].long_name;
                $scope.patient.current.state = $scope.patient.current.landMark[addrlength - 2].long_name;
                $scope.patient.current.city = $scope.patient.current.landMark[addrlength - 4].long_name;
                //$scope.patient.current.landMark = $scope.patient.current.landMark[0].long_name  + ", " + $scope.patient.current.landMark[addrlength - 3].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;
            }
        }else{
            if (currAddrZipCodeParsed) {
            
                $scope.patient.current.zipCode = $scope.patient.current.landMark[addrlength - 1].long_name;
                $scope.patient.current.country = $scope.patient.current.landMark[addrlength - 2].long_name;
                $scope.patient.current.state = $scope.patient.current.landMark[addrlength - 3].long_name;
                $scope.patient.current.city = $scope.patient.current.landMark[addrlength - 6].long_name;
                // $scope.patient.current.landMark = $scope.patient.current.landMark[0].long_name + ", " + $scope.patient.current.landMark[addrlength - 5].long_name + ", " + $scope.patient.current.landMark[addrlength - 3].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;
            } else {
                $scope.patient.current.zipCode = "";
                $scope.patient.current.country = $scope.patient.current.landMark[addrlength - 1].long_name;
                $scope.patient.current.state = $scope.patient.current.landMark[addrlength - 2].long_name;
                $scope.patient.current.city = $scope.patient.current.landMark[addrlength - 4].long_name;
                //$scope.patient.current.landMark = $scope.patient.current.landMark[0].long_name  + ", " + $scope.patient.current.landMark[addrlength - 3].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;
            }
        }
        

        
        
    }

    $scope.permanentAddressLandMark = function() {
        
        var addrlength = $scope.patient.permanent.landMark.length;
        var zipParsed = isFinite($scope.patient.permanent.landMark[addrlength - 1].long_name);
        if(addrlength == 8 || addrlength == 5 ){
            if (zipParsed) {            
                $scope.patient.permanent.zipCode = $scope.patient.permanent.landMark[addrlength - 1].long_name;
                $scope.patient.permanent.country = $scope.patient.permanent.landMark[addrlength - 2].long_name;
                $scope.patient.permanent.state = $scope.patient.permanent.landMark[addrlength - 3].long_name;
                $scope.patient.permanent.city = $scope.patient.permanent.landMark[addrlength - 5].long_name;
                //$scope.patient.current.landMark = $scope.patient.current.landMark[0].long_name + ", " + $scope.patient.current.landMark[addrlength - 5].long_name + ", " + $scope.patient.current.landMark[addrlength - 3].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;

            } else {
                
                $scope.patient.permanent.country = $scope.patient.permanent.landMark[addrlength - 1].long_name;
                $scope.patient.permanent.state = $scope.patient.permanent.landMark[addrlength - 2].long_name;
                $scope.patient.permanent.city = $scope.patient.permanent.landMark[addrlength - 4].long_name;
                //$scope.patient.permanent.landMark = $scope.patient.current.landMark[0].long_name  + ", " + $scope.patient.current.landMark[addrlength - 3].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;
            }
        }else{
            if (zipParsed) {            
                $scope.patient.permanent.zipCode = $scope.patient.permanent.landMark[addrlength - 1].long_name;
                $scope.patient.permanent.country = $scope.patient.permanent.landMark[addrlength - 2].long_name;
                $scope.patient.permanent.state = $scope.patient.permanent.landMark[addrlength - 3].long_name;
                $scope.patient.permanent.city = $scope.patient.permanent.landMark[addrlength - 6].long_name;
                //$scope.patient.current.landMark = $scope.patient.current.landMark[0].long_name + ", " + $scope.patient.current.landMark[addrlength - 5].long_name + ", " + $scope.patient.current.landMark[addrlength - 3].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;

            } else {
                
                $scope.patient.permanent.country = $scope.patient.permanent.landMark[addrlength - 1].long_name;
                $scope.patient.permanent.state = $scope.patient.permanent.landMark[addrlength - 2].long_name;
                $scope.patient.permanent.city = $scope.patient.permanent.landMark[addrlength - 4].long_name;
                //$scope.patient.permanent.landMark = $scope.patient.current.landMark[0].long_name  + ", " + $scope.patient.current.landMark[addrlength - 3].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;
            }
        }

    }


    $scope.sameAddress = function() {
        var addrlength = $scope.patient.current.landMark.length;
        
        var zipParsed = isFinite($scope.patient.current.landMark[addrlength - 1].long_name);
        if ($scope.patient.sameCurrentaddress == false) {
            $scope.patient.permanent = {};
        }
        if ($scope.patient.sameCurrentaddress == true) {
            $scope.patient.permanent = angular.copy($scope.patient.current);
            if(zipParsed){
                if(!angular.isString($scope.patient.current.landMark)){
                    $scope.patient.permanent.landMark = $scope.patient.permanent.landMark[0].long_name + ", " + $scope.patient.permanent.landMark[addrlength - 5].long_name + ", " + $scope.patient.permanent.landMark[addrlength - 3].long_name + ", " + $scope.patient.permanent.landMark[addrlength - 2].long_name;
                }
            }else{
                if(!angular.isString($scope.patient.current.landMark)){
                    $scope.patient.permanent.landMark = $scope.patient.permanent.landMark[0].long_name + ", " + $scope.patient.permanent.landMark[addrlength - 4].long_name + ", " + $scope.patient.permanent.landMark[addrlength - 2].long_name;
                }

            }

        }
    };

    var patientId = $routeParams.id;
    $scope.addPatient = function() {
        console.log($scope.patient);
        var addEditPatient = "/api/regpatients";
        var method = "POST";
        console.log(patientId);
        if (patientId) {
            addEditPatient = "/api/regpatient/" + patientId;
            method = "PUT"
        }
        $http({
            method: method,
            url: addEditPatient,
            data: $scope.patient

        }).success(function(data) {
            console.log(data);
            //$location.path('/patient/list')
        }).error(function(err) {
            console.log(err);
        });
    };

    $scope.patientRecord = function() {

        $http({
            method: 'GET',
            url: "/api/regpatients"
        }).success(function(data) {
            $scope.patientData = data.patient;
    
        }).error(function(err) {
            console.log(err);
        });
    };

    $scope.recordfetched = function() {

        $http({
            method: 'GET',
            url: '/api/regpatient/' + patientId,
        }).success(function(data) {
            if (data != null) {
                $scope.patient = data;
                $scope.patient.permanent.landMark = $scope.patient.permanent.landMark;
                var addrlength = $scope.patient.current.landMark.length;
                //console.log( $scope.patient.permanent.landMark);
                var zipParsed = isFinite($scope.patient.current.landMark[addrlength - 1].long_name);
                if (zipParsed) {
                    if(angular.isString($scope.patient.current.landMark)){
                        $scope.patient.current.landMark = $scope.patient.current.landMark;
                    }else{
                        $scope.patient.current.landMark = $scope.patient.current.landMark[0].long_name + ", " + $scope.patient.current.landMark[addrlength - 5].long_name + ", " + $scope.patient.current.landMark[addrlength - 3].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;
                    }
                } else {
                    if(!angular.isString($scope.patient.current.landMark)){
                        //$scope.patient.permanet.landMark = $scope.patient.permanent.landMark;
                        $scope.patient.current.landMark = $scope.patient.current.landMark[0].long_name  + ", " + $scope.patient.current.landMark[addrlength - 4].long_name + ", " + $scope.patient.current.landMark[addrlength - 2].long_name;

                    }
                }

                console.log($scope.patient.permanent.landMark);
                var permanentAddrLength = $scope.patient.permanent.landMark.length;
                
                var zipParsedPermanent = isFinite($scope.patient.permanent.landMark[permanentAddrLength - 1].long_name);
                if(zipParsedPermanent){
                    if(!angular.isString($scope.patient.permanent.landMark)){
                        $scope.patient.permanent.landMark = $scope.patient.permanent.landMark[0].long_name + ", " + $scope.patient.permanent.landMark[permanentAddrLength - 5].long_name + ", " + $scope.patient.permanent.landMark[permanentAddrLength - 3].long_name + ", " + $scope.patient.permanent.landMark[permanentAddrLength - 2].long_name;
                    }
                }else{
                    if(!angular.isString($scope.patient.permanent.landMark)){
                        $scope.patient.permanent.landMark = $scope.patient.permanent.landMark[0].long_name + ", " + $scope.patient.permanent.landMark[permanentAddrLength - 4].long_name + ", " + $scope.patient.permanent.landMark[permanentAddrLength - 2].long_name;
                    }
                }
            }
        }).error(function(err) {
            console.log(err);
        });
    };

    $scope.patient.parent = {};
    $scope.parentsearch = function(patients) {
        console.log(patients)
        $scope.patient.parent = angular.copy(patients);
    };
});
