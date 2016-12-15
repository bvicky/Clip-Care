app.controller('patientDashboardController', function($scope, $http) {

    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.sortType = '_id'; // set the default sort type
    $scope.sortReverse = false;

    console.log("function");
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
});