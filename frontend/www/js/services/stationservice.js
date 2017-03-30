angular.module('starter.services')

.service('StationService', function($q,$http,$timeout,$compile, API_ENDPOINT) {

 var getAllStation= function() {
	return $q(function(resolve, reject) {
      $http.get(API_ENDPOINT.url + 'station/allst').then(function(result) {
        if (result.data.stations) {
          resolve(result.data.stations);
        } else {
          reject(result.data.stations);
        }
      });
    });
 };

 return{
getAllStation:getAllStation
 };


});