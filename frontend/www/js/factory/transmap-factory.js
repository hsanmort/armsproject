angular.module('starter.factories', [])
.factory('TransmapFact', function (){
	var AppFactory ={
		drawMarker:function(marker,$transMap){
			var infowindow = new google.maps.InfoWindow({
	          	content:" <div ng-non-bindable=''><div style='height:100%;float:left;margin-right:10px;'>"+
	          				"<img style='border-radius: 24px;width:64px;height:64px;' src=data:image/png;base64,"+marker.image+"></img>"+
            				"</div><div style='width:256px;'>"+
            				"<strong>"+marker.name+"</strong><br>"+
            				"<p>"+marker.description+" </p>"+
            				"</div></div>"
	        });
			$transMap.addMarker({
	            lat:parseFloat(marker.Pos.lat),
	            lng:parseFloat(marker.Pos.lng),
	            id:marker._id,
	            name:marker.name,
	            icon:'img/scholar-bus-stop.png',
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
		}
}
return AppFactory;

function isInfoWindowOpen(infoWindow){
	  var map = infoWindow.getMap();
	  return (map !== null && typeof map !== "undefined");
	}
});