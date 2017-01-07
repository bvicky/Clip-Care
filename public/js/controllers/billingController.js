app.controller('billingController', function($scope, $http) {

	$scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.sortType = '_id'; // set the default sort type
    $scope.sortReverse = false;
    $scope.patient = {};
    $scope.billService = [];
    $scope.billing ={};
    $scope.billing.billDate= new Date();
    $('#printbtn').prop('disabled', true);
    
    $scope.fetchPatientRecord = function() {
        $http({
            method: 'GET',
            url: "/api/regpatients"
        }).success(function(data) {
            $scope.patientData = data;
            //console.log($scope.patientData);
        }).error(function(err) {
            console.log(err);
        });
    };

    $scope.getPatient = function(patients){
    	$scope.patient = patients;
        
        $http({
            method: 'GET',
            url: "/api/docsDetail/"+$scope.patient._id,
        }).success(function(data) {
            for(i=0; i<data.length; i++){
                if(data[i].appointmentStatus == 'Booked'){
                    $scope.billing.treatingDocName = data[i].doctorId.firstName + " " + data[i].doctorId.lastName;
                    $scope.billing.referralName = data[i].referralId.name;
                }

            }
        }).error(function(err) {
            console.log(err);
        });
    }

    $scope.getPreviousBills = function(id){
        var pId =id;
        $http({
            method: 'GET',
            url: "/api/billing/"+pId,
        }).success(function(data) {

            $scope.prevBills = data;

            for(i=0;i<$scope.prevBills.length;i++){
                if($scope.prevBills[i]._id.startsWith('F')) {       
                    $scope.prevBills[i].amountBalance = 0;
                }
               
            }
            console.log($scope.prevBills);
            
        }).error(function(err) {
            console.log(err);
        });
    }

    $scope.getAdvanceBills = function(id){
        var pId =id;
        $http({
            method: 'GET',
            url: "/api/advanceBills/"+pId,
        }).success(function(data) {

            $scope.advanceBills =data;
            
        }).error(function(err) {
            console.log(err);
        });
    }

    


    $scope.getBillingServices = function(){
        $http({
            method:'GET',
            url : '/api/billingService'
        }).success(function(data){
            $scope.allBillServices = data;
            

        }).error(function(err){
            console.log(err)
        })
    };




    $scope.getBillDetail = function(name, index){
        for(i= 0 ; i<$scope.allBillServices.length; i++){
            console.log(name == $scope.allBillServices[i].name)
            if(name == $scope.allBillServices[i].name){
                $scope.billing.billService[index].code = $scope.allBillServices[i].code;
                $scope.billing.billService[index].costPrice = $scope.allBillServices[i].costPrice;
                $scope.billing.billService[index].quantity = 1;
                break;
                
            }

        }

        //  $.each($scope.allBillServices, function(i, service){
        //     i = service.code;
        //     console.log(i);
        //     console.log(code);
            

        //     console.log(service);
        // })

    }

    $scope.calcTotal = function(index){
        $scope.billing.billService[index].amount = $scope.billing.billService[index].quantity * $scope.billing.billService[index].costPrice;
    }

    $scope.calcDiscount = function(index){
        var parsedDiscount = parseInt($scope.billing.billService[index].discount);
        console.log(parsedDiscount);

        if(isFinite($scope.billing.billService[index].discount)){
            $scope.billing.billService[index].discount
            $scope.billing.billService[index].amount = $scope.billing.billService[index].costPrice - $scope.billing.billService[index].discount;
        }
        else{

            discountAmount = ($scope.billing.billService[index].costPrice * parsedDiscount) / 100;
            $scope.billing.billService[index].amount = $scope.billing.billService[index].costPrice - discountAmount;

        }
    }

    
    $scope.billing.billService = [{
            code : "",
            name : "",
            quantity : "",
            discount : "",
            amount: "",
        }];
    $scope.addServiceRow = function(index){
        $scope.billing.billService.push({
            code : "",
            name : "",
            quantity : "",
            discount : "",
            amount: "",
        });
    };

    $scope.billTotal = function(){
        $scope.billing.total =0;
        
        

        if($scope.billing.billService[0].amount == ""){
            
            console.log($scope.prevBills);
            $scope.billing.total=0;
            for(i=0;i<$scope.prevBills.length;i++){
               
                $scope.billing.total = $scope.billing.total + $scope.prevBills[i].amountBalance;
                console.log('Total ' +$scope.billing.total);
            }
            console.log($scope.billing.total);
            
        }
        else{
            
            console.log($scope.billing.billService[0].amount);
            for(i=0; i<$scope.billing.billService.length; i++){
            
            $scope.billing.total = $scope.billing.total + $scope.billing.billService[i].amount ;

            }
        }
        
        
    };
    $scope.balanceCalc = function(){

        console.log($scope.billing.amountReceived > $scope.billing.total);
        if($scope.billing.amountReceived > $scope.billing.total){
            $scope.billing.amountBalance = 0;
            $scope.billing.amountReturned = $scope.billing.amountReceived - $scope.billing.total;
        }else{
             $scope.billing.amountReturned = 0;
             $scope.billing.amountBalance =  $scope.billing.total - $scope.billing.amountReceived;
        }
        
    }





    $scope.createBill = function(){
        $scope.billing.patientId = $scope.patient._id;
        $http({
            method : 'POST',
            url : '/api/billing',
            data : $scope.billing
        }).success(function(data){
            $scope.getPreviousBills();
            $('#printbtn').prop('disabled', false);
            console.log(data)
        }).error(function(err){
            console.log(err);
        });
    }

    $scope.printData = function(printID){
        var printContent = $('#'+printID).clone();
        var data = printContent.html();
        var mywindow = window.open('', 'Bill', 'height='+$(window).height()+',width='+$(window).width());
        mywindow.document.write('<html><head><title>Print</title>');
        mywindow.document.write('<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" type="text/css" />');
        mywindow.document.write('</head><body>');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');

         mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

         setTimeout(function(){
          mywindow.print();
          mywindow.close();
      }, 500)
    }


});