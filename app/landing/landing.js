'use strict';

angular.module('landing', ['ngRoute','ngToast'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landing', {
    templateUrl: 'landing/landing.html',
    controller: 'LandingCtrl'
  });
}])

.controller('LandingCtrl', ['$scope','$http','ngToast',function($scope,$http,ngToast) {
	$scope.dates = [];
	$scope.years = [];
	$scope.signupdata = {};
	$scope.logindata = {};

	$scope.getDates = function(){
		for(var i=1;i<=31;i++){
			if(i<10){
				var val = "0" + i;
				$scope.dates.push(val);
			}
			else{
				$scope.dates.push(i.toString());
			}			
		}
	}

	$scope.getYears = function(){
		for(var i=1950;i<=1992;i++){
			$scope.years.push(i.toString());			
		}
	}	

	$scope.getDates();
	$scope.getYears();

	$scope.registerUser = function(){		
		var url = "https://api.datingkinky.com/signup";
		$scope.signupdata.dateOfBirth = $scope.signupdata.date + "/" + $scope.signupdata.month + "/" + $scope.signupdata.year;
		console.log($scope.signupdata);
		$http.post(url, $scope.signupdata).success(function(response) {
			console.log(response);
			$('#signupModal').modal('hide');
			$scope.signupdata = {};
		}).error(function(error){
			console.log(error.errors);
			for (var property in error.errors) {
			    if (error.errors.hasOwnProperty(property)) {
			        console.log(property);
			        console.log(error.errors[property]);
			        ngToast.create(error.errors[property].msg);
			    }
			}
			
		});		
	}

	$scope.loginUser = function(){
		console.log($scope.logindata);
		var url = "https://api.datingkinky.com/authenticate";
		$http.post(url, $scope.logindata).success(function(response) {
			console.log(response);
			$('#loginModal').modal('hide');
			$scope.logindata = {};
			console.log("redirect to inside home page view if user der");//user based
		}).error(function(error){
			console.log(error.errors);
			for (var property in error.errors) {
			    if (error.errors.hasOwnProperty(property)) {
			        console.log(property);
			        console.log(error.errors[property]);
			        ngToast.create(error.errors[property].msg);
			    }
			}			
		});					
	}

}]);