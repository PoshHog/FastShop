angular.module('app').controller('LoginController', ['$scope', '$location', '$route', 'LoginService', function ($scope, $location, $route, LoginService) {
    $scope.loginState = "Login";
    $scope.loginMessage = "";
    $scope.login = async function(){
        $scope.loginState = "Logging in...";
        try {
            const response = await LoginService.login($scope.email, $scope.password);
            console.log(response);
            $scope.loginResult = response;
            $scope.loginValid = response.login;
            if($scope.loginValid == "valid"){
                $scope.loginState = "Success";
                localStorage.setItem("fastshop.token", response.token);
                localStorage.setItem("fastshop.loginID", response.id);
                localStorage.setItem("fastshop.loginName", response.name);
                $scope.roles = response.roles;
                $scope.primaryRole = $scope.roles[0];
                if($scope.primaryRole == "customer"){
                    $location.path("/home").replace();
                }else if($scope.primaryRole == "admin"){
                    $location.path("/admin").replace();
                }else if($scope.primaryRole == "customerservice"){
                    $location.path("/customerservice").replace();
                }else if($scope.primaryRole == "warehouse"){
                    $location.path("/warehouse").replace();
                }else if($scope.primaryRole == "courier"){
                    $location.path("/courier").replace();
                }else if($scope.primaryRole == "marketing"){
                    $location.path("/marketing").replace();
                }
            }else{
                $scope.loginState = "Login"
                $scope.loginMessage = "Login failed, check your email/password and try again."
            }
        } catch (error) {
            $scope.loginResult = error.message;
        } finally {
            $scope.$applyAsync();
        }
    }
    $scope.goToRegister = async function(){
        $location.path("/register").go();
    }
    $scope.registerMessage = "";
    $scope.register = async function(){
        try {
            if($scope.password == $scope.confirmPassword){
                const response = await LoginService.register($scope.email, $scope.password, $scope.fn, $scope.sn, $scope.num);
                $scope.registerResult = response;
                $scope.registerValid = response.register;
                if($scope.registerValid == "valid"){
                    localStorage.setItem("fastshop.token", response.token);
                    localStorage.setItem("fastshop.loginID", response.id);
                    if($scope.fn!=null){
                        localStorage.setItem("fastshop.loginName", $scope.fn);
                    }else{
                        localStorage.setItem("fastshop.loginName", $scope.email);
                    }
                    $location.path("/home").replace();
                }else if ($scope.registerValid == "exists"){
                    $scope.registerMessage = "Account already registered. Go back to login.";
                }else{
                    $scope.registerMessage = `Registration failed, please check the ${$scope.registerValid} field and try again.`
                }
            }else{
                $scope.registerMessage = "Passwords do not match";
            }
        } catch (error) {
            $scope.registerResult = error.message;
        } finally {
            $scope.$applyAsync();
        }  
    }
}]);