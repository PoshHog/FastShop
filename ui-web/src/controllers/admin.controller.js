angular.module('app').controller('AdminController', ['$scope', '$location', '$route', '$sce', 'AdminService', function ($scope, $location, $route, $sce, AdminService) {
    $scope.view = "account";
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
    $scope.addRoleView = async function(){
        $scope.view = "add";
        try{
            const availableRoles = await AdminService.getAvailableRoles();
            $scope.availableRoles = availableRoles.roles;
            var torem = [];
            $scope.roles.forEach(accountRole => {
                $scope.availableRoles.forEach(availRole => {
                    if(accountRole.id == availRole.id){
                        torem.push(availRole);
                    }
                });
            });
            console.log(torem);
            torem.forEach(remRole =>{
                $scope.availableRoles.splice($scope.availableRoles.indexOf(remRole), 1);
                console.log('spliced');
            });
        }catch (error) {
            $scope.loginResult = error.message;
        } finally {
            $scope.$applyAsync();
        }
    }
    $scope.add = async function(roleid){
        await AdminService.addRole(localStorage.getItem("fastshop.token"), $scope.accountid, roleid);
        $scope.getAccount();
    }
    $scope.remove = async function(roleid){
        await AdminService.removeRole(localStorage.getItem("fastshop.token"), $scope.accountid, roleid);
        $scope.getAccount();
    }
}]);