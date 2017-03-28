angular.module('starter.services', [])

.service('StationService', function($q, $http, API_ENDPOINT) {

  var get = function() {
    return $q(function(resolve, reject) {
      $http.get(API_ENDPOINT.url + '/allst').then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  
 return {
    get: get
    
  };

});


