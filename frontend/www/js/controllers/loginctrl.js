angular.module('starter.controllers', [])



.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state,$window) {
  console.log("LoginCtrl hsan");
 $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      console.log($scope.user);
      //$state.go('app.station');
      
      /*$window.location.href='/#/app/station';*/
              /*$state.go('app.station', null, {reload: true});*/
               window.location.reload()
               $state.go('app.station');
               
      
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})


.controller('SignupCtrl', function($scope,AuthService, $ionicPopup, $state) {
    console.log("SignupCtrl hsan");
	  $scope.user = {
    email: '',
    login: '',
    name: '',
    password: ''
  };
 
  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('app.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})

;
