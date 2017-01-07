app.controller('adminDashboardController', function ($scope, $http) {

	$scope.totalPatientsCount = function(){
		$http({
			method : 'GET',
			url: '/statistics/totalPatientsCount'
		}).success(function(data){
			$scope.totalPatientsCount = data;
		}).error(function(err){
			console.log(err);
		})
	}
	$scope.totalServiceCount = function(){
		$http({
			method : 'GET',
			url: '/statistics/totalServiceCount'
		}).success(function(data){
			$scope.totalServiceCount = data;
		}).error(function(err){
			console.log(err);
		})
	}
	$scope.totalDoctorsCount = function(){
		$http({
			method : 'GET',
			url: '/statistics/totalDoctorsCount'
		}).success(function(data){
			$scope.totalDoctorsCount = data;
		}).error(function(err){
			console.log(err);
		})
	}
	
})