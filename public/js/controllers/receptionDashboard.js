app.controller('receptionDashboardController', function($scope, $http) {
	
	$scope.getTodayAppointments= function(){
		$http({
			method : 'GET',
			url : '/api/todayAppointment'
		}).success(function(data){
			$scope.appointments = data;
			console.log(data);
		}).error(function(err) {
        	console.log(err);
    	});
	}


	$scope.getAppointments= function(){
		$http({
			method : 'GET',
			url : '/api/appointment'
		}).success(function(data){
			$scope.allAppointments = data;
			console.log(data);
		}).error(function(err) {
        	console.log(err);
    	});
	}
	



})