angular.module('app').controller('WarehouseController', ['$scope', '$location', '$route', 'WarehouseService', function ($scope, $location, $route, WarehouseService) {
    
    $scope.view = 'deliveries';
    $scope.currentDelivery;
    $scope.currentOrderIn;
    
    $scope.getDeliveries = async function(){
        try{
            result = await WarehouseService.getDeliveries(localStorage.getItem('fastshop.token'));
            if(result.token == 'valid'){
                $scope.deliveriesResult = result.deliveries;
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.getOrdersIn = async function(){
        try{
            result = await WarehouseService.getOrdersIn(localStorage.getItem('fastshop.token'));
            if(result.token == 'valid'){
                $scope.ordersInResult = result.ordersIn;
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.viewDelivery = async function(delivery){
        try{
            result = await WarehouseService.getDeliveryItems(localStorage.getItem('fastshop.token'), delivery.id);
            if(result.token == 'valid'){
                $scope.currentDelivery = delivery;
                $scope.deliveryItemsResult = result.deliveryItems;
                $scope.view = 'deliveryItems';
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.viewOrder = async function(order){
        try{
            result = await WarehouseService.getOrderItems(localStorage.getItem('fastshop.token'), order.id);
            if(result.token == 'valid'){
                $scope.currentOrderIn = order;
                $scope.ordersInItemsResult = result.ordersInItems;
                $scope.view = 'itemsIn';
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.completeItem = async function(item){
        try{
            item.complete = true;
            var allComplete = true;
            for (const item in $scope.currentDelivery.deliveryItems) {
                if ($scope.currentDelivery.hasOwnProperty(item)) {
                    const element = $scope.currentDelivery.deliveryItems[item];
                    if(element.complete==undefined){
                        allComplete = false;
                    }
                }
            }
            if(allComplete){
                await WarehouseService.readyDelivery(localStorage.getItem('fastshop.token'), $scope.currentDelivery.id);
                getDeliveries();
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.presentItem = async function(item){
        try{
            item.complete = true;
            var allComplete = true;
            for (const item in $scope.currentOrderIn.ordersInItems) {
                if ($scope.currentDelivery.hasOwnProperty(item)) {
                    const element = $scope.currentOrderIn.ordersInItems[item];
                    if(element.complete!=true){
                        allComplete = false;
                    }
                }
            }
            if(allComplete){
                await WarehouseService.completeOrderIn(localStorage.getItem('fastshop.token'), $scope.currentOrderIn.id);
                getOrdersIn();
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.incompleteItem = async function(item){
        try{
            item.complete = false;
            await WarehouseService.missingDelivery(localStorage.getItem('fastshop.token'), $scope.currentDelivery.id, item.id);

        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.missingItem = async function(item){
        try{
            item.complete = false;
            await WarehouseService.missingOrderIn(localStorage.getItem('fastshop.token'), $scope.currentOrderIn.id, item.id);
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.getDeliveries();
    $scope.getOrdersIn();

}]);