angular.module('app').controller('CourierController', ['$scope', '$location', '$route', 'CourierService', function ($scope, $location, $route, CourierService) {
    $scope.view = 'schedule';
    
    $scope.getAvailableDeliveries = async function(){
        try{
            result = await CourierService.getAvailableDeliveries(localStorage.getItem('fastshop.token'));
            if(result.token == 'valid'){
                $scope.deliveriesResult = result.deliveries;
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.getSchedule = async function(){
        try{
            result = await CourierService.getSchedule(localStorage.getItem('fastshop.token'));
            if(result.token == 'valid'){
                $scope.scheduleResult = result.schedule;
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.viewDelivery = async function(delivery){
        try{
            result = await CourierService.getDeliveryItems(localStorage.getItem('fastshop.token'), delivery.id);
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

    $scope.acceptDelivery = async function(delivery){
        try{
            result = await CourierService.acceptDelivery(localStorage.getItem('fastshop.token'), delivery.id);
            if(result.token == 'valid'){
                $scope.getAvailableDeliveries();
                $scope.getSchedule();
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
                await CourierService.completeDelivery(localStorage.getItem('fastshop.token'), $scope.currentDelivery.id);
                getDeliveries();
            }
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.incompleteItem = async function(item){
        try{
            item.complete = false;
            await CourierService.missingItemOnDelivery(localStorage.getItem('fastshop.token'), $scope.currentDelivery.id, item.id);
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.getAvailableDeliveries();
    $scope.getSchedule();
}]);