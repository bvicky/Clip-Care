app.controller("referralMasterController", function($scope, $http, $route, $timeout) {

    $scope.pageSize = 5;
    $scope.currentPage = 1;

    $scope.sortType = 'referralType'; // set the default sort type
    $scope.sortReverse = false;

    $scope.resetButton = function() {
        resetForm(addReferralForm);
    };

    $scope.addressLandMark = function(){
        //console.log($scope.referral.landMark);
        var addrlength = $scope.referral.landMark.length;
        var currAddrZipCodeParsed = isFinite($scope.referral.landMark[addrlength - 1].long_name);
        if(addrlength == 8 || addrlength == 5){
            if (currAddrZipCodeParsed) {
                console.log($scope.referral.landMark[addrlength - 1].long_name);
                

                $scope.referral.zipCode = $scope.referral.landMark[addrlength - 1].long_name;
                console.log($scope.referral.zipCode);
                $scope.referral.country = $scope.referral.landMark[addrlength - 2].long_name;
                $scope.referral.state = $scope.referral.landMark[addrlength - 3].long_name;
                $scope.referral.city = $scope.referral.landMark[addrlength - 5].long_name;
                // $scope.referral.landMark = $scope.referral.landMark[0].long_name + ", " + $scope.referral.landMark[addrlength - 5].long_name + ", " + $scope.referral.landMark[addrlength - 3].long_name + ", " + $scope.referral.landMark[addrlength - 2].long_name;
            } else {
                
                $scope.referral.country = $scope.referral.landMark[addrlength - 1].long_name;
                $scope.referral.state = $scope.referral.landMark[addrlength - 2].long_name;
                $scope.referral.city = $scope.referral.landMark[addrlength - 4].long_name;
                $scope.referral.zipCode = "";
                //$scope.referral.landMark = $scope.referral.landMark[0].long_name  + ", " + $scope.referral.landMark[addrlength - 3].long_name + ", " + $scope.referral.landMark[addrlength - 2].long_name;
            }
        }else{
            if (currAddrZipCodeParsed) {
            
                $scope.referral.zipCode = $scope.referral.landMark[addrlength - 1].long_name;
                $scope.referral.country = $scope.referral.landMark[addrlength - 2].long_name;
                $scope.referral.state = $scope.referral.landMark[addrlength - 3].long_name;
                $scope.referral.city = $scope.referral.landMark[addrlength - 6].long_name;
                // $scope.referral.landMark = $scope.referral.landMark[0].long_name + ", " + $scope.referral.landMark[addrlength - 5].long_name + ", " + $scope.referral.landMark[addrlength - 3].long_name + ", " + $scope.referral.landMark[addrlength - 2].long_name;
            } else {
                $scope.referral.zipCode = "";
                $scope.referral.country = $scope.referral.landMark[addrlength - 1].long_name;
                $scope.referral.state = $scope.referral.landMark[addrlength - 2].long_name;
                $scope.referral.city = $scope.referral.landMark[addrlength - 4].long_name;
                //$scope.referral.landMark = $scope.referral.landMark[0].long_name  + ", " + $scope.referral.landMark[addrlength - 3].long_name + ", " + $scope.referral.landMark[addrlength - 2].long_name;
            }
        }
        
    }





    /*Category List*/
    $scope.referralCategory = {};
    $scope.createReferralCateogry = function() {
        //console.log("INSIDE referral");
        $http({
            method: 'POST',
            url: "/api/createReferralCateogry",
            data: $scope.referralCategory
        }).success(function(data) {
            console.log(data);
            $scope.message = data.msg;
            $scope.existData = data.existData;
            $timeout(function () {
                  $scope.message = false;
                  $scope.existData = false;
            }, 2000);
            $scope.categories();
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



    /*End Category List*/


    resetForm = function(addReferralForm) {
        $scope.referral = {};
        var contactInfo = {
            personName: "",
            designation: "",
            mobileNumber: ""
        };
        $scope.referral.contactPersons = [contactInfo];
        //  if(addReferralForm){

        // }
    }
    resetForm();


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


    /*Master Referral*/
    $scope.addreferral = function(addReferralForm) {
        var referralID = $scope.referral._id;
        console.log(referralID);
        var addEditLink = "/api/referrals";
        var method = "POST";
        if (referralID) {
            addEditLink = "/api/referral/" + referralID;
            method = "PUT"
        }
        console.log("INSIDE");
        $http({
            method: method,
            url: addEditLink,
            data: $scope.referral
        }).success(function(data) {
            resetForm(addReferralForm);
            addReferralForm.$setPristine();
            addReferralForm.$setUntouched();
            $scope.fetchReferralRecord();
            $scope.message = data.msg;
            $scope.existData = data.existData;
            $scope.referral.isActive = true;
            $timeout(function () {
                  $scope.message = false;
                  $scope.existData = false;
            }, 2000);
           
        }).error(function(err) {
            console.log(err);
        });
    };


    $scope.fetchReferralRecord = function() {

        $http({
            method: 'GET',
            url: "/api/referrals"
        }).success(function(data) {
            console.log(data)
            $scope.referredlist = data;
            

        }).error(function(err) {
            console.log(err);
        });
    };

    $scope.editReferralRecord = function(id) {
        console.log('clicked');
        console.log(id);
        $http({
            method: 'GET',
            url: '/api/referral/' + id
        }).success(function(data) {
            $scope.referral = data;
            var addrlength = $scope.referral.landMark.length;
            var zipParsed = isFinite($scope.referral.landMark[addrlength - 1].long_name);
                if (zipParsed) {
                    if(angular.isString($scope.referral.landMark)){
                        $scope.referral.landMark = $scope.referral.landMark;
                    }else{
                        $scope.referral.landMark = $scope.referral.landMark[0].long_name + ", " + $scope.referral.landMark[addrlength - 5].long_name + ", " + $scope.referral.landMark[addrlength - 3].long_name + ", " + $scope.referral.landMark[addrlength - 2].long_name;
                    }
                } else {
                    if(!angular.isString($scope.referral.landMark)){
                        //$scope.patient.permanet.landMark = $scope.patient.permanent.landMark;
                        $scope.referral.landMark = $scope.referral.landMark[0].long_name  + ", " + $scope.referral.landMark[addrlength - 4].long_name + ", " + $scope.referral.landMark[addrlength - 2].long_name;

                    }
                }
        }).error(function(err) {
            console.log(err);
        })
    };


    $scope.deleteReferralRecord = function(id) {
        console.log(id)
        $http({
            method: 'DELETE',
            url: '/api/referral/' + id
        }).success(function(data) {
            console.log(data)
        }).error(function(err) {
            console.log(err);
        });
    };
    /*End Master Referral*/
});
