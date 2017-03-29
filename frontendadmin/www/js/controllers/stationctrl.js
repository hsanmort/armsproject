angular.module('starter.controllers')



.controller('StationCtrl',function($scope, $ionicPopup,StationService, $state,$cordovaGeolocation) {
	var options = {timeout: 10000, enableHighAccuracy: true};
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){

		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var mapOptions=optionInt(latLng);
		var $stationMap= new transMap(document.getElementById("map"),mapOptions);
			
			StationService.getAllStation().then(function(result){
			 
			 	$scope.stations=result;

			var marker;
			var i=0;
			 angular.forEach($scope.stations,function(station,index){
				var infowindow = new google.maps.InfoWindow({
	              content:"<div style='width:250px;height:100px;'>"+station.name+"</div>"
	            });
			 	marker=$stationMap.addMarker({
	                lat:parseFloat(station.Pos.lat),
	                lng:parseFloat(station.Pos.lat),
	                id:station._id,
	                name:station.name,
	                draggable: false,
                	info:infowindow
                });

                $stationMap.markers.items[i].addListener('click', function() {
                  if (isInfoWindowOpen(this.info)) {
                    this.info.close();
                  }else {
                    this.info.open($stationMap.gMap, this);
                  }
                });

                i++;
			 });
		});	
	});
	function isInfoWindowOpen(infoWindow){
	  var map = infoWindow.getMap();
	  return (map !== null && typeof map !== "undefined");
	}
});


