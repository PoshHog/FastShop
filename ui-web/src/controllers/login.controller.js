angular.module('app').controller('LoginController', ['$scope', '$location', '$route', 'LoginService', function ($scope, $location, $route, LoginService) {
    $scope.login = async function(){
        $scope.loginResult = await LoginService.login($scope.email, $scope.password);
    }
}]);