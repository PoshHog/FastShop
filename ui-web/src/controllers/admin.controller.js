angular.module('app').controller('AdminController', ['$scope', '$location', '$route', '$sce', 'AdminService', function ($scope, $location, $route, $sce, AdminService) {
    $scope.currentAccount = "No results";
    $scope.currentAccountRoles = $sce.trustAsHtml("<tr><td>No Role</td> <td>Remove</td></tr>");
    $scope.getAccount = async function(){
        $scope.currentAccount = "Viewing roles for : "+$scope.email;
        try{
            const accountInfo = await AdminService.getAccount();
            if(accountInfo.token == "valid"){
                $scope.accountid = accountInfo.accountid;
                $scope.roles = accountInfo.roles;
            }
        }catch (error) {
            $scope.loginResult = error.message;
        } finally {
            $scope.$applyAsync();
        }
    }
    $scope.addRole = async function(){

    }
    $scope.remove = async function(roleid){
        await AdminService.removeRole($scope.accountid, roleid);
        getAccount();
    }
}]);