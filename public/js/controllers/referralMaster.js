app.controller("referralMasterController", function($scope, $http, $route, $timeout) {

    $scope.pageSize = 5;
    $scope.currentPage = 1;

    $scope.sortType = 'referralType'; // set the default sort type
    $scope.sortReverse = false;

    $scope.resetButton = function() {
        resetForm(addReferralForm);
    };
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
            console.log(data);
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
