app.controller('masterBillingController',['$scope','$http','Upload', function($scope, $http, Upload) {
	$scope.datetimepicker_options = { format: 'MM/DD/YYYY HH:mm'};

	$scope.billingService = {};

	$scope.uploadCirc = function(){
		console.log('clicked');	
		if ($scope.masterBilling.$valid && $scope.billingService.circular) { //check if from is valid
                $scope.upload($scope.billingService.circular) //call upload function
        }
	}

	

	$scope.upload= function(file){
		$scope.fileName = file.name;
		Upload.upload({
			url : '/api/upload',
			data : {file : file}
		}).success(function(data){
			console.log(data);
			

		}).error(function (err){
			console.log(err);
		})
	}

	$scope.addBillingService = function(){
		$scope.billingService.circular = $scope.fileName;
		$http({
			method : 'POST',
			url : '/api/billingService',
			data : $scope.billingService
		}).success(function(data){
			$scope.billingService = {};
			console.log(data);
			 $scope.billingService.department = data.department;
		}).error(function (err){
			console.log(err);
		})
	};

	$scope.getBillingService = function(){
		$http({
			method : 'GET',
			url : '/api/billingService',
		}).success(function(data){
			$scope.services = data;
		}).error(function(err){
			console.log(err);
		})
	}
}]);