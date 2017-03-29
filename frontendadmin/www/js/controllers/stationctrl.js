angular.module('starter.controllers')



.controller('StationCtrl',function($scope, $ionicPopup,StationService,TransmapFact, $state,$cordovaGeolocation,$compile) {
	var options = {timeout: 10000, enableHighAccuracy: true};
	var ajout =0;
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var mapOptions=optionInt(myPos);
		var $stationMap= new transMap(document.getElementById("map"),mapOptions);
			
		StationService.getAllStation().then(function(result){
			$scope.stations=result;
			var marker;
			var i=0;
			angular.forEach($scope.stations,function(station,index){
			 	TransmapFact.drawMarker(station,$stationMap);
				TransmapFact.addInfoWindowListner($stationMap.markers.items[i],$stationMap);
                i++;
			});
		});	

		$scope.addStation = function() {
	      var content="<div  class='list' style='height:50px;width:300px;overflow:hidden;'>"+
	                              "<div style='border-style:none;'class='item item-input'>"+
	                                "<label class='item-input-wrapper'>"+
	                                  "<input type='text' ng-model='stationSave' placeholder='nom de station'>"+
	                                "</label>"+
	                                "<button ng-click='savestat()'class='button button-small'>enregistrer</button"+
	                              "</div>"+
	                            "</div>";
	      var compiled = $compile(content)($scope);
	      if (ajout==0) {
	        ajout++;
	        var alertPopup = $ionicPopup.alert({
	          title: 'ajouter une station',
	          template: 'cliquez dans la carte pour ajouter une station'
	        });
	        alertPopup.then(function(res) {
	          google.maps.event.addListener($stationMap.gMap,"click",function(e){
	            TransmapFact.addMarkertmp(e.latLng,$stationMap,compiled,$scope);
	            google.maps.event.clearListeners($stationMap.gMap, 'click');
	          });
	        });
	      }else {
	        google.maps.event.addListener($stationMap.gMap,"click",function(e){
	          TransmapFact.addMarkertmp(e.latLng,$stationMap,compiled,$scope);
	          google.maps.event.clearListeners($stationMap.gMap, 'click');
	        });
	      }
   		};
   		$scope.savestat=function() {
		    if (($scope.stationSave!=null ) && ($scope.stationSave!="")) {
		       StationService.addStation($stationMap,$scope.currentmarker,$scope,$scope.stationSave).then(function(result){
		       	$stationMap.removeBy($scope.currentmarker);
		       	$stationMap.markers.remove($scope.currentmarker);
		       	delete $scope.currentmarker;
		       	delete $scope.stationSave;
		       	TransmapFact.drawMarker(result,$stationMap);
		       	StationService.getAllStation().then(function(result){
					$scope.stations=result;
				});
		       });
		       
		    }
	    }
	    $scope.remove = function(station) {
		    var confirmPopup = $ionicPopup.confirm({
		       title: 'Confirmer suppression',
		       cancelText: 'Annuler',
		       cancelType: 'button-light',
		       template: 'Êtes-vous sûr de vouloir supprimer la station ?'
		    });
		    confirmPopup.then(function(res) {
		       if(res) {
		        	StationService.removeStation($scope,station,$stationMap).then(function(result){
		        		var found =$stationMap.findBy(function(marker){
		                	return marker.id==result._id;
		              	});
		              	console.log(found);
			            $stationMap.removeBy(found[0]);
			            $stationMap.markers.remove(found[0]);
			            
			            StationService.getAllStation().then(function(result){
							$scope.stations=result;
						});
		        	});
		       	}
		    });
		};
	});
	
});


