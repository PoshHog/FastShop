angular.module('app').controller('HomeController', ['$scope', '$location', '$route', 'LoginService', function ($scope, $location, $route, LoginService) {
    $scope.account = "Login";
    if(localStorage.getItem("fastshop.loginName")!=null){
        $scope.account = localStorage.getItem("fastshop.loginName");
        $scope.login = async function(){
            $location.path('/account').go();
        }
    }else{
        $scope.login = async function(){
            $location.path('/login').go();
        }
    }
}]);