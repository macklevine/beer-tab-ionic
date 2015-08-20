var main = angular.module('beer-tab.main', ['beer-tab.services', 'angular-jwt', 'ngTable']);


main.controller('MainCtrl', function ($scope, $window, beerPmt, jwtHelper, AuthService, getTable, util, location, profile) {
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
  console.log('$scope.user', $scope.user);


  //this is used to show the add friend button, and hide the
  // new friend form
  $scope.clicked = false;


  //This function sennds a request to the server, it returns 
  //the updated information
  $scope.sendBeer = function (user) {

    if(user){
      console.log('sendBeer called', user);
      if(AuthService.isAuth()) {
        beerPmt.newIOU(user)
        .then(function(derp){
          console.log(derp); 
          $scope.network = util.toArr(derp.network);
          
        });
      }
    }
  };

  $scope.sendLoc = function(user){
    if(navigator.geolocation){
      navigator.geolocation.watchPosition(function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        console.log('check your server', lat, lon);
        location.locPost(user, [lat, lon]);
      });
    }else{
      console.log('you goofed');
    }
  }

  $scope.getLoc = function (user) {
    location.locGet(user);
  }

  $scope.sendLoc($scope.user);
  $scope.getLoc($scope.user);

  $scope.getProfile = function(username){
    return 'assets/profiles/' + profile.profile(username);
  }

});
