angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'views/register.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/account', {
        templateUrl: 'views/user/account.html',
        controller: 'LoginController'
    });

    $routeProvider.otherwise({
        templateUrl: 'views/not-found.view.html'
    })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
}]);