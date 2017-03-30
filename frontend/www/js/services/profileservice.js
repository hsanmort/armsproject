angular.module('starter.services')

.service('ProfileService', function($q,$http,$timeout,$compile, API_ENDPOINT) {


 var profile = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + 'api/updatprofile/', user._id).then(function(result) {
        if (result.data.success) {
          resolve(result.data.voyageur);
        } else {
          reject(result.data.voyageur);
        }
      });
    });
  };

  return {
    profile: profile
   
  };

});