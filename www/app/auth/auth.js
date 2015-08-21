var auth = angular.module('beer-tab.auth', ['ngFileUpload']);

auth.controller('AuthCtrl', function ($scope, Upload, $rootScope, $window, $location, AuthService) {
  
  $scope.user = {};
  $scope.logIn = function () {
    $window.username = $scope.user.username;
    AuthService.login($scope.user)
      .then(function (token) {
        if (token === "password incorrect"){
          $scope.passwordIncorrect = true;
          $scope.usernameNotFound = false;
        } else if (token === "username not found"){
          $scope.usernameNotFound = true;
          $scope.passwordIncorrect = false;
        } else {
          $window.localStorage.setItem('com.beer-tab', token);
          $location.path('/main');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signUp = function () {

    var signUserUp = function(){
      AuthService.signup($scope.user)
        .then(function (token) {
          //handle logic here like above.
          if (token === "username already exists"){
            $scope.usernameExists = true;
          } else {
            $window.localStorage.setItem('com.beer-tab', token);
            $location.path('/main');
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    
    //perform logic here; check for presence of $scope.user.profile...
    if ($scope.user.profile){
      console.log($scope.user.profile + " is the value for $scope.user.profile...")
      Upload.upload({
        url: '/profileupload', //TODO: change to something that makes more sense.
        file: $scope.user.profile,
        fileName: $scope.user.username + ".jpg"
      }).then(function(){
        signUserUp();
      });
    } else {
      console.log($scope.user.profile + " is the value for $scope.user.profile...")
      signUserUp();
    }

  };

  $scope.signout = function () {
    AuthService.signout();
  };

});
