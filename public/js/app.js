var app = angular.module('myApp', ['datetimepicker', 'ngRoute', 'ui.bootstrap', 'ngMessages', 'toggle-switch', 'btorfs.multiselect', 'ui.calendar', 'ngFileUpload', 'smart-table' ]);
    app.config(function($routeProvider) {
        $routeProvider
            .when("/", { title: "Registration", templateUrl: "registration.html", controller: "registrationController" })
            .when("/referral/register", { title: "Referral Master", templateUrl: "referral_master.html", controller: "referralMasterController" })
            .when("/referral/edit/:id", { title: "Referral Master", templateUrl: "referral_master.html", controller: "referralMasterController" })
            .when("/patient/list", { title: "Patient Dashboard", templateUrl: "patientdashboard.html", controller: "patientDashboardController" })
            .when("/patient/edit/:id", { title: "Patient Edit", templateUrl: "registration.html", controller: "registrationController" })
            .when("/test", { title: "Test", templateUrl: "test.html", controller: "testController" })
            .when("/doctor/register", { title: "Doctor Master", templateUrl: "doctor_master.html", controller: "doctorMasterController" })
            .when("/appointment/book", { title: "Appointment", templateUrl: "appointment.html", controller: "appointmentController" })
            .when("/appointment/dashboard", { title: "Appointment Dashboard", templateUrl: "appointmentDashboard.html", controller: "appointmentDashboardController" })
            .when("/dashboard", { title: "Dashboard", templateUrl: "dashboard.html", controller: "dashboardController" })   
            .when("/receptionist/dashboard", { title: "Receptionist Dashboard", templateUrl: "receptionistDashboard.html", controller: "receptionDashboardController" })   
            .when("/billing/add/Service", { title: "Master Billing", templateUrl: "master_billing.html", controller: "masterBillingController" })
            .when("/billing", { title: "Billing", templateUrl: "billing_module.html", controller: "billingController" });
    });

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        if (current.$$route.title)
            $rootScope.title = current.$$route.title;
    });

}]);

app.filter('startFrom', function() {
    return function(data, start) {
        if (!data || !data.length) {
            return;
        }
        start = +start; //parse to int
        return data.slice(start);
    }
});


app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    scope.details = scope.gPlace.getPlace();
                    var completeAddress = scope.details;
                    model.$setViewValue(completeAddress.address_components);

                });
            });
        }
    };
});
//myApp.factory('myService', function() {});

function MyCtrl($scope) {
    $scope.gPlace;
}



app.controller('testController', function($scope) {

});

app.controller('dashboardController', function($scope) {

});

app.controller('appointmentController', function($scope, $log) {

    $scope.uiConfig = {
        calendar: {
            editable: true,
            height: 650,
            header: {
                left: 'today prev,next',
                center: 'title',
                right: 'month agendaWeek agendaDay listDay'
            },
            // eventDrop: $scope.alertOnDrop,
            // eventResize: $scope.alertOnResize,
            // eventClick: $scope.eventClick,
            // viewRender: $scope.renderView
            dayClick: $scope.changeView

        }

    };

    $scope.changeView = function(date, jsEvent, view) {
        alert(view.name);

    }


});

