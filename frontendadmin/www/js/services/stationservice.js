angular.module('starter.services')

.service('StationService', function($q,$http,$timeout,$compile, API_ENDPOINT) {
var AppService ={
 	getAllStation:function() {
		q=$q.defer();
      $http.get(API_ENDPOINT.url + 'station/allst').then(function(result) {
        if (result.data.stations) {
          q.resolve(result.data.stations);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
 	},
 	removeStation:function($scope,marker,$transMap){
 		q=$q.defer();
      $http.delete(API_ENDPOINT.url + 'station/removest/'+marker._id)
        .then(function(result) {
        	if (result.data.station) {
        		console.log("ok");
          		q.resolve(result.data.station);
        	} else {
          		q.reject(result.data.msg);
        	}
          });
        return q.promise;
  },
  stationUpdate:function($scope,marker,$transMap,stationName){
    q=$q.defer();
    var data = {
            name: stationName,
            lat: marker.lat,
            lng:marker.lng
        };
   $transMap.removeBy(marker);
    $http.put(API_ENDPOINT.url + 'station/updatst/'+marker.id,data)
      .then(function(result) {
        if (result.data.station) {
       
            q.resolve(result.data.station);
        } else {
            q.reject(result.data.msg);
        }
      });
    return q.promise;
  },
  addStation:function($transMap,marker,$scope,stationName) {
  	if (marker) {
		q=$q.defer();
		var data = {
            name: stationName,
            lat: marker.lat,
            lng:marker.lng
        };
        console.log(data.name);
        
      $http.post(API_ENDPOINT.url + 'station/addst',data).then(function(result) {
        if (result.data.msg) {
          q.resolve(result.data.station);
        } else {
          q.reject(result.data.msg);
        }
      });
      return q.promise;
    };
  }
}
 return AppService;

});