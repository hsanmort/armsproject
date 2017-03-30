angular.module('starter.factories', [])
.factory('TransmapFact', function (){
	var AppFactory ={
		drawMarker:function(marker,$transMap){
			var infowindow = new google.maps.InfoWindow({
	          	content:"<div style='width:250px;height:100px;'>"+marker.name+"</div>"
	        });
			$transMap.addMarker({
	            lat:parseFloat(marker.Pos.lat),
	            lng:parseFloat(marker.Pos.lng),
	            id:marker._id,
	            name:marker.name,
	            icon:'img/busstop.png',
	            draggable: false,
	        	info:infowindow
	        });
		},
		addInfoWindowListner:function(marker,$transMap){
			marker.addListener('click', function() {
	            if (isInfoWindowOpen(this.info)) {
	                this.info.close();
	            }else {
	                this.info.open($transMap.gMap, this);
	            }
			});
		},
		addMarkertmp:function(latLng,$transMap,compiled,$scope){
			$scope.currentmarker=$transMap.addMarker({
		        lat:parseFloat(latLng.lat()),
		        lng:parseFloat(latLng.lng()),
		        icon:'img/busstopred.png',
		        draggable: false
		    });
	        var infowindow = new google.maps.InfoWindow();
	        infowindow.setContent(compiled[0]);
	        google.maps.event.trigger($scope.currentmarker, 'click');
	        infowindow.open($transMap, $scope.currentmarker);
	        
	        google.maps.event.addListener(infowindow,'closeclick',function(){
	        	$transMap.removeBy($scope.currentmarker);
	        });
		},
		updateMarker:function($id,$scope,$transMap,compiled){
			var current =$transMap.findBy(function(marker){
	       		return marker.id==$id;
	     	});
			$scope.stationUpdat=current[0].name;
			$scope.found=current;
			$scope.found[0].setIcon("img/busstopred.png");
			var infowindow = new google.maps.InfoWindow();
			infowindow.setContent(compiled[0]);
			infowindow.open($transMap, $scope.found[0]);
			$scope.found[0].setDraggable(true);

			google.maps.event.addListener(infowindow,'closeclick',function(){
			infowindow.close();
			$scope.found[0].setIcon("img/busstop.png");
			$scope.found[0].setDraggable(false);
			$scope.selectedModif=false;
			var LatLng = new google.maps.LatLng( parseFloat(current[0].lat),parseFloat(current[0].lng));
			$scope.found[0].setPosition(LatLng);
			});
		}
}
return AppFactory;

function isInfoWindowOpen(infoWindow){
	  var map = infoWindow.getMap();
	  return (map !== null && typeof map !== "undefined");
	}
});