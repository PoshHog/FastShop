angular.module('app').controller('CustomerserviceController', ['$scope', '$location', '$route', 'CustomerserviceService', 'LoginService', function ($scope, $location, $route, CustomerserviceService, LoginService) {

    $scope.currentView = "search";
    $scope.message = "";
    $scope.customerEdit = "false";
    $scope.orderEdit = "false";
    $scope.itemEdit = "false";
    $scope.chosenOrder = "";
    $scope.changeStatusAllowed = "true";

    $scope.searchCustomers = async function(){
        $scope.message = "Searching...";
        try{
            result = await CustomerserviceService.search(localStorage.getItem('fastshop.token'), $scope.email, $scope.fn, $scope.sn, $scope.num, $scope.postcode);
            if(result.token == 'valid'){
                $scope.message = "Search complete";
                $scope.searchResult = result.customers;
            }

        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.addCustomer = async function(){
        try{
            result = await LoginService.register($scope.email, "", $scope.fn, $scope.sn, $scope.num)
            if(result.register == 'valid'){
                $scope.message = "Registration complete";
            }

        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }
    
    $scope.editDetails = async function(customer){
        try{
            if($scope.customerEdit != "false"){
                await LoginService.updateCustomer(localStorage.getItem('fastshop.token'), $scope.customerEdit.id, $scope.customerEdit.fn, $scope.customerEdit.sn, $scope.customerEdit.email, $scope.customerEdit.num, $scope.customerEdit.l1, $scope.customerEdit.postcode);
            }
            $scope.customerEdit = customer;
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.viewOrders = async function(id){
        $scope.currentView = "account";
        try{
            result = await CustomerserviceService.getOrders(localStorage.getItem('fastshop.token'), id);
            if(result.token == 'valid'){
                $scope.transactionsResult = result.orders;
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.editOrder = async function(order){
        try{
            if($scope.orderEdit != "false"){
                await CustomerserviceService.editOrder(localStorage.getItem('fastshop.token'), $scope.orderEdit.id, $scope.orderEdit.l1, $scope.orderEdit.postcode);
            }
            $scope.orderEdit = order;
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.cancelOrder = async function(order){
        try{
            await CustomerserviceService.cancelOrder(localStorage.getItem('fastshop.token'), order.id);
            order.status = "cancelled";
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.viewItems = async function(order){
        try{
            result = await CustomerserviceService.viewItems(localStorage.getItem('fastshop.token'), order.id);
            if(result.token == "valid"){
                $scope.itemsResult = result.items;
                $scope.chosenOrder = order;
                $scope.currentView = "order";
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.editItem = async function(item){
        try{
            if($scope.orderEdit != "false"){
                await CustomerserviceService.editItem(localStorage.getItem('fastshop.token'), $scope.itemEdit.id, $scope.itemEdit.quantity);
            }
            $scope.itemEdit = item;
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.cancelItem = async function(item){
        try{
            await CustomerserviceService.cancelItem(localStorage.getItem('fastshop.token'), item.id);
            viewItems(chosenOrder);
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

}]);