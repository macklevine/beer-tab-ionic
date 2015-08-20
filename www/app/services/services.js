angular.module('beer-tab.services', [])

.factory('AuthService', function ($http, $location, $window) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (resp) {
        return resp.data.token;
      });
  };
 
  authService.signup = function(credentials) {
    console.log('cred:', credentials);
    return $http
      .post('/signup', credentials)
      .then(function (resp) {
        return resp.data.token;
      });
  };

  authService.isAuth = function () {
    return !!$window.localStorage.getItem('com.beer-tab');
  };

  authService.signout = function () {
    $window.localStorage.removeItem('com.beer-tab');
    $location.path('/login');
  };

  return authService;
})


.factory('getTable', function ($window, $http) {
  
  var getTable = function (user) {
    return $http({
      method: 'POST',
      url: '/table',
      data: {user: user}
    })
    .then(function (resp) {
      console.log(resp.data);
      return resp.data;
    });
  };


  return {
    getTable: getTable,
  };
})



.factory('beerPmt', function ($window, $http) {
  
  var newIOU = function (user) {
    return $http({
      method: 'POST',
      url: '/tabs',
      data: {token: $window.localStorage.getItem('com.beer-tab'), user: user}
    })
    .then(function (resp) {
      console.log(resp.data);
        return resp.data;
    });
  };


  return {
    newIOU: newIOU,
  };
})
.factory('util', function(){
  var helper = {};
  
  helper.toArr = function (obj){
    var temp = [];
    for(var key in obj){
      temp.push({
        username: key,
        tab: obj[key]
      });
    }
    return temp;
  };

  return helper;
})
.factory('location', function ($http) {
  var locPost = function (user, loc) {
    return $http({
      method: 'POST',
      url: '/location',
      data: {lat: loc[0], lon: loc[1], user: user}
    });
  };
  var locGet = function(user){
    return $http({
      method: 'POST',
      url: '/location',
      data: {user: user}
    })
    .then(function (resp) {
      console.log(resp.data);
    });
  }
  return {locPost: locPost, locGet: locGet};
})
.factory('profile', function ($http){
  var searchedArr = [];
  var stringArr = [];
  var profile = function (username) {
    if (searchedArr.indexOf(username) === -1){
      searchedArr.push(username);
      $http({
        method: 'POST',
        url: '/profile',
        data: {username: username}
      })
      .then(function(resp){
        // console.log(resp.data + " is the data");
        stringArr.push(resp.data);
        return resp.data;
      });
    } else {
      return stringArr[searchedArr.indexOf(username)];
    }
  }
  return {profile: profile};
})



