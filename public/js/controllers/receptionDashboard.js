app.controller('receptionDashboardController', function($scope, $http) {
	$scope.getTodaysAppointments = function(){
		$scope.docIds = [];
    	$http({
			method : 'GET',
			url : '/api/todayAppointment'
		}).success(function(data){
			$scope.appointments = data;
			
			for(i=0; i<$scope.appointments.length; i++){
				$scope.appointments[i].startDate = moment($scope.appointments[i].startTime).format("MM/DD/YYYY");
				$scope.appointments[i].startTime = moment($scope.appointments[i].startTime).utcOffset("-00:00").format(" hh:mm a");
				$scope.docIds.push({id: $scope.appointments[i].doctorId._id, appointmentTime : $scope.appointments[i].startTime});	//push doc id and appnt start time
			}

			$http({
				method: 'GET',
				url : '/api/todayDoctor'
			}).success(function(data){
				$scope.doctors = data;
				console.log($scope.doctors)	;
				var totalAppntCount=0;
				for(i=0;i<$scope.doctors.length;i++){
					for(k=0;k<$scope.doctors[i].shift.length;k++){
						for(j=0;j<$scope.appointments.length;j++){
							appointmentStartTime = $scope.appointments[j].startTime;
							docStartTime = moment($scope.doctors[i].shift[k].workFrom).format('hh:mm a');
							docEndTime = moment($scope.doctors[i].shift[k].workTo).format('hh:mm a');

							console.log($scope.doctors[i]._id);
							console.log($scope.appointments[j].doctorId._id);
							console.log($scope.doctors[i]._id == $scope.appointments[j]._id);

							if($scope.doctors[i]._id == $scope.appointments[j].doctorId._id){
								if(moment(appointmentStartTime, 'hh:mm a') >= moment(docStartTime, 'hh:mm a') && moment(appointmentStartTime, 'hh:mm a') <= moment(docEndTime, 'hh:mm a')){
								console.log('yes');
								totalAppntCount ++;
								
								}
								console.log(totalAppntCount);
								$scope.doctors[i].shift[k].bookedSlots = totalAppntCount;
								$scope.doctors[i].shift[k].availableSlots = $scope.doctors[i].shift[k].maxSlots - $scope.doctors[i].shift[k].bookedSlots;
								console.log('Slots' +$scope.doctors[i].shift[k].bookedSlots);

							}
							
						}
						totalAppntCount=0;
					}
				}
				

			}).error(function(err) {
        		console.log(err);
    		});

			
		}).error(function(err) {
        	console.log(err);
    	});
	}

	$scope.getAppointments= function(){
		console.log('called');
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
	


	// $scope.getTodaysDoctors = function(){

	// 	$http({
	// 		method: 'GET',
	// 		url : '/api/todayDoctor'
	// 	}).success(function(data){
	// 		$scope.doctors = data;
	// 		console.log($scope.doctors)	;
	// 		var totalAppntCount=0;
	// 		console.log($scope.appointments.length);




	// 		// for(i=0;i<$scope.doctors.length;i++){
	// 		// 	for(j=0;j<$scope.docIds.length;j++){

	// 		// 		if($scope.doctors[i]._id == $scope.docIds[j].id){
	// 		// 			for(k=0;k<$scope.doctors[i].shift.length; k++){
	// 		// 				for(l=0; l<$scope.appointments.length; l++){

	// 		// 					console.log($scope.appointments[l].startTime)
	// 		// 					appointmentStartTime = $scope.appointments[l].startTime;
	// 		// 					docStartTime = moment($scope.doctors[i].shift[k].workFrom).format('hh:mm a');
	// 		// 					docEndTime = moment($scope.doctors[i].shift[k].workTo).format('hh:mm a');
	// 		// 					console.log('Appointment');
	// 		// 					console.log('Appointment Starting Time :: ' +appointmentStartTime);							
	// 		// 					console.log('Doctor Starting Time :: ' +docStartTime);
	// 		// 					console.log('Doctor End Time :: ' +docEndTime)
	// 		// 					console.log('Doctors id ' +$scope.doctors[i]._id);
	// 		// 					console.log('Consulting Doc Id  ' +$scope.docIds[j].id);

	// 		// 					console.log('Comp Id'+ $scope.doctors[i]._id == $scope.docIds[j].id);
	// 		// 					if(moment(appointmentStartTime, 'hh:mm a') >= moment(docStartTime, 'hh:mm a') && moment(appointmentStartTime, 'hh:mm a') <= moment(docEndTime, 'hh:mm a')){
	// 		// 						console.log('yes');
	// 		// 						totalAppntCount ++;
									
	// 		// 					}
	// 		// 					console.log(totalAppntCount);
	// 		// 					$scope.doctors[i].shift[k].bookedSlots = totalAppntCount;
	// 		// 					console.log('Slots' +$scope.doctors[i].shift[k].bookedSlots);

	// 		// 				}
	// 		// 				totalAppntCount =0;
	// 		// 			}
						
	// 		// 		}
									
	// 		// 	}
				
	// 		// }

	// 	}).error(function(err) {
 //        	console.log(err);
 //    	});
	// }



})