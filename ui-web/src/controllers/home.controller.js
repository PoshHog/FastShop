angular.module('app').controller('HomeController', ['$scope', '$location', '$route', 'LoginService', function ($scope, $location, $route, LoginService) {
    $scope.account = "Login";
    $scope.login = async function(){
        $location.path('/login').replace();
    }
}]);