angular.module('starter.services')

.service('LigneService', function($q,$http,$timeout,$compile, API_ENDPOINT) {
	var AppServiceLigne ={
	 	getAllLigne:function() {
			var q=$q.defer();
	      $http.get(API_ENDPOINT.url + 'ligne/all').then(function(result) {
	        if (result.data.lignes) {
	          q.resolve(result.data.lignes);
	        } else {
	          q.reject(result.data.msg);
	        }
	      });
	      return q.promise;
	 	},
	 	addLigne:function(ligneName,ligneDescription) {
			var q=$q.defer();
			var data = {
	            name: ligneName,
	            description: ligneDescription
        	};
	      $http.post(API_ENDPOINT.url + 'ligne/add',data).then(function(result) {
	        if (result.data.ligne) {
	          q.resolve(result.data.ligne);
	        } else {
	          q.reject(result.data.msg);
	        }
	      });
	      return q.promise;
	 	},
	 	addstL:function(station,ligne,order,scope) {
			var q=$q.defer();
			var data = {
	            id: ligne._id,
	            station: station._id,
	            order:order
        	};
	      $http.post(API_ENDPOINT.url + 'ligne/addst',data).then(function(result) {
	        if (result.data.ligne) {
	          q.resolve(result.data.ligne);
	        } else {
	          q.reject(result.data.msg);
	        }
	      });
	      return q.promise;
	 	},
	 	changeOrder:function(ligne,station){
		var q=$q.defer();
			var data = {
	            id: ligne,
	            station: station.station._id,
	            order:station.order
        	};
	      $http.post(API_ENDPOINT.url + 'ligne/updatest',data).then(function(result) {
	        if (result.data.ligne) {
	          q.resolve(result.data.ligne);
	        } else {
	          q.reject(result.data.msg);
	        }
	      });
	      return q.promise;
		},
	 	removeLi:function($scope,li,index) {
			var q=$q.defer();
			$http.delete(API_ENDPOINT.url + 'ligne/remove/'+li._id)
			.then(function(result) {
				if (result.data.ligne) {
					$scope.ligne.splice(index,1);
					if ($scope.directionDisplay) {
			            $scope.directionDisplay.setMap(null);
			        }
			  		q.resolve(result.data.ligne);
				} else {
			  		q.reject(result.data.msg);
				}
			  });
			return q.promise;
		}
	}
 	return AppServiceLigne;
});
