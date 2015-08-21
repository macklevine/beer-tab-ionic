var maps = angular.module('beer-tab.maps', ['beer-tab.services', 'angular-jwt', 'ngTable']);

maps.controller('MapsCtrl', function ($scope, $window, jwtHelper, getTable, util, location) {
  // Retrieve token from localStorage
  $scope.jwt = $window.localStorage.getItem('com.beer-tab');
  // Decode token (this uses angular-jwt. notice jwtHelper)
  $scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);
  // Object used to contain user's beer network
  getTable.getTable($scope.user)
    .then(function (derp) {
      $scope.network = util.toArr(derp);
    });

  // $scope.network =  argle || $scope.decodedJwt.network;
  // Pull username from token to display on main page
  $scope.user = $scope.decodedJwt.username;

  $scope.marker;

  $scope.getLoc = function (user, callback) {
      location.locGet(user)
      .then(function (derp) {
        $scope.marker = derp;
        callback();
      });
  };

  $scope.GenerateMapMarkers = function () {
    var myLatlng = new google.maps.LatLng(37.7837667, -122.4092151);
    
    var mapOptions = {
      zoom: 11,
      center: myLatlng
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    for (var k = 0; k < $scope.marker.length; k++ ){
      var latLong = new google.maps.LatLng($scope.marker[k].lat, $scope.marker[k].long);
      var marks = new google.maps.Marker({
        position: latLong,
        title: $scope.marker[k].name,
      });

      marks.setMap(map);
    }
  };

  $scope.getLoc($scope.user, $scope.GenerateMapMarkers);

});