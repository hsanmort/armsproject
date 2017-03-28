angular.module('starter.controllers', [])



.controller('StationCtrl', ['$http',function($scope, StationService, $ionicPopup, $state) {
 var handleError = function(res) {
      console.log(res);
    };

    this.stations = [];

    this.getAll = function() {
      StationService.get()
      .then(function(res) {
        this.stations = res.data;
      }.bind(this), handleError);
    }.bind(this);



}]);


