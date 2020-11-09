angular.module('app').controller('MarketingController', ['$scope', '$location', '$route', 'MarketingService', function ($scope, $location, $route, MarketingService) {
    
    $scope.view='suppliers';
    $scope.viewSupplier='all';
    $scope.itemEdit = false;

    $scope.search = async function(criteria){
        try {
            result = await MarketingService.searchCompanies(localStorage.getItem('fastshop.token'), criteria);
            if(result.token == 'valid'){
                $scope.suplierResult = result.suppliers;
            }
        } catch (error) {

        } finally {
            $scope.$applyAsync();
        }
    }

    $scope.viewSupplierInventory = async function(supplier){
        try {
            result = await MarketingService.getInventory(localStorage.getItem('fastshop.token'), supplier.id);
            if(result.token == 'valid'){
                $scope.supplierInventoryResult = result.items;
                $scope.viewSupplier=supplier;
            }
        } catch (error) {

        } finally {
            $scope.$applyAsync();
        }
    }

    $scope.addSupplier = async function(){
        try {
            result = await MarketingService.addSupplier(localStorage.getItem('fastshop.token'), $scope.addName, $scope.addDesc, $scope.addCC, $scope.addNum, $scope.addL1, $scope.addPostcode);
            if(result.token == 'valid'){
                $scope.search("");
                $scope.viewSupplier = 'all';
            }
        } catch (error) {

        } finally {
            $scope.$applyAsync();
        }
    }

    $scope.editItem = async function(item){
        try{
            if($scope.orderEdit != "false"){
                await MarketingService.editItem(localStorage.getItem('fastshop.token'), $scope.editItem.id, $scope.itemEdit.name, $scope.itemEdit.desc, $scope.itemEdit.quantity, $scope.itemEdit.price, $scope.itemEdit.weight, $scope.itemEdit.barcode);
            }
            $scope.itemEdit = item;
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.reOrder = async function(item){
        try{
            await MarketingService.orderItem(localStorage.getItem('fastshop.token'), item.id, $scope.orderQuantity);
            $scope.getInventory();
        }catch(error){

        }finally{
            $scope.$applyAsync();
        }
    }

    $scope.getInventory = async function(){
        try {
            result = await MarketingService.getInventory(localStorage.getItem('fastshop.token'));
            if(result.token == 'valid'){
                $scope.inventoryResult = result.items;
            }
        } catch (error) {

        } finally {
            $scope.$applyAsync();
        }
    }

    $scope.search("");
    $scope.getInventory();
}]);