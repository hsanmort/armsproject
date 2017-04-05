angular.module('starter.controllers')

.controller('LigneCtrl',function($scope,$ionicPopup,$timeout,$sce,$state,$filter,$cordovaGeolocation,$compile,TransmapFact,LigneService,StationService) {
	var options = {timeout: 10000, enableHighAccuracy: true};
	var ajout =0;
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var mapOptions=optionInt(myPos);
		var $ligneMap= new transMap(document.getElementById("map"),mapOptions);

		StationService.getAllStation().then(function(result){
			$scope.stations=result;
			var marker;
			var i=0;
			angular.forEach($scope.stations,function(station,index){
			 	TransmapFact.drawMarker(station,$ligneMap);
				TransmapFact.addInfoWindowListner($ligneMap.markers.items[i],$ligneMap);
                i++;
			});
		});
		LigneService.getAllLigne().then(function(res){
			$scope.ligne=res;
		});
		$scope.addLigne=function () {
			$scope.data = {};
			$scope.enregistrer=false;
			var myPopup = $ionicPopup.show({
				template: '<label class="item item-input"><input type="number" placeholder="numero de ligne.." ng-model="data.numligne"></label><label class="item item-input"><input type="text" placeholder="nom de ligne.." ng-model="data.nomligne"></label>',
				title: 'entre nom & numero de la ligne',
				scope: $scope,
				buttons: [
				  { text: 'Annuler' },
				  {
				    text: '<b>enregistrer</b>',
				    type: 'button-positive',
				    onTap: function(e) {
				      if ((!$scope.data.numligne)&&(!$scope.data.nomligne)) {
				        e.preventDefault();
				      }else {
				        $scope.enregistrer=true;
				      }
				    }
				  }
				]
			});
			myPopup.then(function(res) {
				if ($scope.enregistrer) {
				  	LigneService.addLigne($scope.data.numligne,$scope.data.nomligne,$scope);
				  	LigneService.getAllLigne().then(function(res){
						$scope.ligne=res;
					});
				}
			});
		}
		$scope.removeLi=function (li,index) {
	      var confirmPopup = $ionicPopup.confirm({
	        title: 'Confirmer suppression',
	        cancelText: 'Annuler',
	        cancelType: 'button-light',
	        template: 'Êtes-vous sûr de vouloir supprimer la ligne ?'
	      });
	      confirmPopup.then(function(res) {
	        if(res) {
	          LigneService.removeLi($scope,li,index);
	        }
	      });
	    }
	    $scope.currenetLigneShow= "selectionnez une ligne dans le menu à droite";
	    $scope.currenetLigne=null;
	      $scope.toggleGroup = function(group) {
	      group.show = !group.show;
	      if (group.show==true) {
	        if ($scope.currenetLigne!=null) {
	          $scope.currenetLigne.show=false;
	          if ($scope.directionDisplay) {
	            $scope.directionDisplay.setMap(null);
	          }
	        }
	        $scope.stat=group.stations;
	          $scope.currenetLigne= group;
	          $scope.currenetLigneShow=group.name;
	          console.log($scope.currenetLigne);
	          if ($scope.currenetLigne.stations.length!=0) {
	            $scope.drawLigne($scope.currenetLigne);
	          }
	      }
	      if(group.show==false) {
	        console.log("ok");
	        $scope.currenetLigne=null;
	        $scope.stat=null;
	        $scope.currenetLigneShow= "selectionnez une ligne dans le menu à droite";
	        if ($scope.directionDisplay) {
	          $scope.directionDisplay.setMap(null);
	        }
	      }
	    };
	    $scope.moveItem=function(st,fromIndex,toIndex){
      if (toIndex< $scope.stat.length) {
        $scope.stat.splice(fromIndex,1);
        $scope.stat.splice(toIndex,0,st);
        if (toIndex>fromIndex) {
          for (var i = fromIndex; i <= $scope.stat.length-1; i++) {
            $scope.stat[i].order=i+1;
            serviceLigne.changeOrder($scope.currenetLigne._id,$scope.stat[i]);
          }
        }else if (toIndex<fromIndex) {
          for (var j = toIndex; j <= fromIndex; j++) {
            $scope.stat[j].order=j+1;
            serviceLigne.changeOrder($scope.currenetLigne._id,$scope.stat[j]);
          }
        }
        $scope.currenetLigne.stations=$scope.stat;
        $scope.directionDisplay.setMap(null);
        $scope.drawLigne($scope.currenetLigne);
      }
    }
	    $scope.isGroupShown = function(group) {
	      return group.show;
	    };
	    $scope.addst=function (sta) {
        	LigneService.addstL(sta,$scope.currenetLigne,$scope.stat.length+1,$scope).then(function(result){
        		console.log($scope.currenetLigne);
        		var searchs=document.getElementById("searchS");
        		searchs.value="";
        		$scope.searchStat();
        		var found= $filter('filter')(result.stations,{order:$scope.stat.length+1}, true);
            	$scope.currenetLigne.stations.push(found[0]);
            	console.log($scope.currenetLigne);
            	$scope.directionDisplay.setMap(null);
            	$scope.drawLigne($scope.currenetLigne);
        	});
    	};
	    $scope.searchStat=function () {
	      var searchs=document.getElementById("searchS");
	      $scope.searchs=searchs.value;
	      if (($scope.searchs=="")&&($scope.testRes)) {
	          var searchbar=document.getElementById("searchRes");
	          var content='<ion-list  id="searchRes"></ion-list>';
	          var compiled = $compile(content)($scope);
	          searchbar.replaceWith(compiled[0]);
	          $scope.testRes=false;
	      }
	      if (searchs.value!="") {
	        if (!$scope.testRes) {
	          var searchbar=document.getElementById("searchbar");
	          var content='<ion-list id="searchRes"><ion-item class="searchRes" ng-repeat="sta in stations |filter:searchs" ng-click="addst(sta)">{{sta.name}}</ion-item></ion-list>';
	          var compiled = $compile(content)($scope);
	        var searchRes=document.getElementById("searchRes");
	        searchRes.replaceWith(compiled[0]);
	        //$scope.searchRes= $sce.trustAsHtml(compiled[1]);
	        $scope.testRes=true;
	        }
	        else{
	          var content='<ion-list id="searchRes"><ion-item class="searchRes" ng-repeat="sta in stations |filter:searchs" ng-click="addst(sta)">{{sta.name}}</ion-item></ion-list>';
	          var compiled = $compile(content)($scope);
	        var se=document.getElementById("searchRes");
	        se.replaceWith(compiled[0]);
	        }
	        }
	    }
	    $scope.gotoPosLigne=function ($id) {
              $ligneMap.zoom(12);
              var found =$ligneMap.findBy(function(marker){
                return marker.id==$id;
              });
              $ligneMap.gMap.setCenter(found[0].getPosition());
            }
        $scope.drawLigne=function (ligne) {
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
	    };
	});
});