/*** token-based-auth-frontend ***/

// Controller
$scope.signin = function() {
  var formData = {
    email: $scope.email,
    password: $scope.password
  }

  Main.signin(formData, function(res) {
    if (res.type == false) {
      alert(res.data)
    } else {
      $localStorage.token = res.data.token; // save token in localStorage
      window.location = "/";
    }
  }, function() {
    $rootScope.error = 'Failed to signin';
  })
};

$scope.signup = function() {
  var formData = {
    email: $scope.email,
    password: $scope.password
  }

  Main.signup(formData, function(res) {
    if (res.type == false) {
      alert(res.data)
    } else {
      $localStorage.token = res.data.token; // save token in localStorage
      window.location = "/"
    }
  }, function() {
    $rootScope.error = 'Failed to signup';
  })
};

$scope.me = function() {
  Main.me(function(res) {
    $scope.myDetails = res;
  }, function() {
    $rootScope.error = 'Failed to fetch details';
  })
};

$scope.logout = function() {
  Main.logout(function() {
    window.location = "/"
  }, function() {
    alert("Failed to logout!");
  });
};
$scope.token = $localStorage.token;


// Service
factory('Main', ['$http', '$localStorage', function($http, $localStorage) {
  var baseUrl = "your_service_url";

  function changeUser(user) {
    angular.extend(currentUser, user);
  }

  function urlBase64Decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  function getUserFromToken() {
    var token = $localStorage.token;
    var user = {};
    if (typeof token !== 'undefined') {
      var encoded = token.split('.')[1];
      user = JSON.parse(urlBase64Decode(encoded));
    }
    return user;
  }

  var currentUser = getUserFromToken();

  return {
    signin: function(data, success, error) {
      $http.post(baseUrl + '/signin', data).success(success).error(error)
    },
    signup: function(data, success, error) {
      $http.post(baseUrl + '/signup', data).success(success).error(error)
    },
    me: function(success, error) {
      $http.get(baseUrl + '/me').success(success).error(error)
    },
    logout: function(success) {
      changeUser({});
      delete $localStorage.token;
      success();
    }
  };
}])

// In the sign-up or sign-in part of the application
// the bearer token responds to the request and this token is saved to local storage.
// Whenever you make a request to a service in the back-end, you need to put this token in the headers.
// You can do this by using AngularJS interceptors.
$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
  return {
    'request': function(config) {
      config.headers = config.headers || {};
      if ($localStorage.token) {
        config.headers.Authorization = 'Bearer ' + $localStorage.token;
      }
      return config;
    },
    'responseError': function(response) {
      if (response.status === 401 || response.status === 403) {
        $location.path('/signin');
      }
      return $q.reject(response);
    }
  };
}]);


// Router
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

  $routeProvider.
  when('/', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  }).
  when('/signin', {
    templateUrl: 'partials/signin.html',
    controller: 'HomeCtrl'
  }).
  when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'HomeCtrl'
  }).
  when('/me', {
    templateUrl: 'partials/me.html',
    controller: 'HomeCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}])
