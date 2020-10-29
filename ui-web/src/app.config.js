angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });

    $routeProvider.otherwise({
        templateUrl: 'views/not-found.view.html'
    })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
}]);