angular.module('starter.controllers')

.controller('VoyageCtrl',function($scope,$ionicPopup,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,TransmapFact,VoyageService,LigneService,StationService) {
	var options = {timeout: 10000, enableHighAccuracy: true};
	var ajout =0;
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var mapOptions=optionInt(myPos);
		var $voyageMap= new transMap(document.getElementById("map"),mapOptions);

		StationService.getAllStation().then(function(result){
			$scope.stations=result;
			var marker;
			var i=0;
			angular.forEach($scope.stations,function(station,index){
			 	TransmapFact.drawMarker(station,$voyageMap);
				TransmapFact.addInfoWindowListner($voyageMap.markers.items[i],$voyageMap);
                i++;
			});
		});
		LigneService.getAllLigne().then(function(res){
			$scope.ligne=res;
		});
		$scope.gotoPosLigne=function ($id) {
              $ligneMap.zoom(12);
              var found =$ligneMap.findBy(function(marker){
                return marker.id==$id;
              });
              $ligneMap.gMap.setCenter(found[0].getPosition());
            }

	    $scope.selectLigne = function(ligne) {
	      	var searchs=document.getElementById("searchS");
        	searchs.value="";
        	$scope.searchStat();
        	searchs.value=ligne.name;
	        $scope.currenetLigne=ligne;
	        VoyageService.getVoyageByLigne(ligne._id).then(function(result){
	        $scope.voyages=result;	
	        console.log($scope.voyages);
	        });	        
	    };
		$scope.addVoyage=function () {
			$scope.data = {};
			$scope.enregistrer=false;
			var myPopup = $ionicPopup.show({
				template: "Heur de départ :<label class='item item-input'><input type='time' placeholder='heur de départ' ng-model='data.dateDepart'></label>Heur d'arriver :<label class='item item-input'><input type='time' placeholder='nom de ligne..' ng-model='data.dateArriver' ></label>",
				title: 'entre nom & numero de la ligne',
				scope: $scope,
				buttons: [
				  { text: 'Annuler' },
				  {
				    text: '<b>enregistrer</b>',
				    type: 'button-positive',
				    onTap: function(e) {
				      if ((!$scope.data.dateDepart)||(!$scope.data.dateArriver)) {
				        e.preventDefault();
				      }else {
				      	$scope.data.dateArriver=$scope.data.dateDepart;
				        $scope.enregistrer=true;
				      }
				    }
				  }
				]
			});
			myPopup.then(function(res) {
				if ($scope.enregistrer) {
				  	VoyageService.addVoyage($scope.currenetLigne._id,$scope.data.dateDepart,$scope.dateArriver);
			        VoyageService.getVoyageByLigne($scope.currenetLigne._id).then(function(result){
			        $scope.voyages=result;	
			        });	   
				}
			});
		}	    

		$scope.searchStat=function () {
	      var searchs=document.getElementById("searchS");
	      $scope.searchs=searchs.value;
	      if (($scope.searchs=="")&&($scope.testRes)) {
	      		if($scope.currenetLigne){
	      			delete $scope.currenetLigne;
	      			delete $scope.voyages;
	      		}
	          var searchbar=document.getElementById("searchRes");
	          var content='<ion-list  id="searchRes"></ion-list>';
	          var compiled = $compile(content)($scope);
	          searchbar.replaceWith(compiled[0]);
	          $scope.testRes=false;
	      }
	      if (searchs.value!="") {
	        if (!$scope.testRes) {
	          var searchbar=document.getElementById("searchbar");
	          var content='<ion-list id="searchRes"><ion-item class="searchRes" ng-repeat="li in ligne |filter: {name:searchs}" ng-click="selectLigne(li)">{{li.name}}</ion-item></ion-list>';
	          var compiled = $compile(content)($scope);
	        var searchRes=document.getElementById("searchRes");
	        searchRes.replaceWith(compiled[0]);
	        $scope.testRes=true;
	        }
	        else{
	          var content='<ion-list id="searchRes"><ion-item class="searchRes" ng-repeat="li in ligne |filter:{name: searchs}" ng-click="selectLigne(li)">{{li.name}}</ion-item></ion-list>';
	          var compiled = $compile(content)($scope);
	        var se=document.getElementById("searchRes");
	        se.replaceWith(compiled[0]);
	        }
	        }
	    }
	    /*$scope.drawLigne=function (ligne) {
        	console.log();
	      $scope.directionService= new google.maps.DirectionsService();
	      $scope.directionDisplay= new google.maps.DirectionsRenderer({
	        'map':$ligneMap.gMap
	      });
	      waypts=[];
	      for (var i in $scope.currenetLigne.stations ) {
	        for (var j in $ligneMap.markers.items) {
	            var found=$ligneMap.markers.items[j];
	          if (found.id==$scope.currenetLigne.stations[i].station._id) {
	            if ($scope.currenetLigne.stations[i].order==1) {
	              var origin=found;
	              $scope.gotoPosLigne(origin.id);
	            }else if ($scope.currenetLigne.stations[i].order==$scope.currenetLigne.stations.length) {
	              var destination=found;
	            }else{
	              var stop=found.getPosition()
	              waypts.push({
	                          location:stop,
	                          stopover:true});
	            }
	          }
	        }
	      }
	      var request = {
	        origin: origin.getPosition(),
	        destination: destination.getPosition(),
	        waypoints:waypts,
	        travelMode: google.maps.DirectionsTravelMode.DRIVING,
	        unitSystem: google.maps.DirectionsUnitSystem.METRIC
	      };
	      $scope.directionService.route(request,function(response,status){
	        if (status == google.maps.DirectionsStatus.OK) {
	          $scope.directionDisplay.setDirections(response);
	          $scope.directionDisplay.setOptions({
	            polylineOptions:{strokeColor: '#00FF77'},
	            suppressMarkers: true,
	            preserveViewport:true
	          });
	        }
	      });
	    };*/
	});
});