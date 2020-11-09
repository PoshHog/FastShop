angular.module('app').
factory('MarketingService', ['$http', 'ConfigService', function($http, ConfigService) {

    function handleError(error) {
        if (error?.status == -1) {
            throw new Error('Communications failure');
        } else if (error?.data?.error) {
            throw new Error(error.data.error);
        } else {
            throw new Error('Unknown error');
        }
    }

    var service = {};

    service.search = async (token, criteria) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}company/search/${companyID}/${token}/${criteria}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.getInventory = async (token, id = null) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url;
        if(criteria == null){
            url = `${base}company/inventory/${companyID}/${token}`;
        }else{
            url = `${base}company/inventory/${companyID}/${token}/${id}`;
        }
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.addSupplier = async (token, name, desc, cc, num, l1, postcode) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}company/add/${companyID}/${token}/${name}/${desc}/${cc}/${num}/${l1}/${postcode}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.editItem = async (token, id, name, desc, quantity, price, weight, barcode) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}company/inventory/edit/${companyID}/${token}/${id}/${name}/${desc}/${quantity}/${price}/${weight}/${barcode}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.orderItem = async (token, id, quantity) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}company/inventory/order/${companyID}/${token}/${id}/${quantity}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    return service;
}]);