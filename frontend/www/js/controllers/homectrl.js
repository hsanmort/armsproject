angular.module('starter.controllers')

.controller('AppCtrl', function($scope,AuthService, $ionicConfig,$state) {
	console.log("hsan AppCtrl");
	
	$scope.isAuth=false;
	$scope.isAuth=AuthService.isAuthenticated;
		if($scope.isAuth==true)	{
	AuthService.getinfo().then(function(result){
	 console.log("appel getinfo");
	 	$scope.user=result;
		console.log($scope.user.User.name);
	});
	 $scope.logout = function() {
	    AuthService.logout();
	    $state.go('app.station');
	  };
	 }else{console.log(AuthService.isAuthenticated);}



})

.controller('ProfileCtrl', function($scope,AuthService,ProfileService) {
AuthService.getinfo().then(function(result){
	 	console.log("getinfo in profile");
	 	$scope.user=result;


	});

});