angular.module('app').
factory('WarehouseService', ['$http', 'ConfigService', function($http, ConfigService) {

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

    service.getDeliveries = async (token) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}warehouse/deliveries/${companyID}/${token}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.getOrdersIn = async (token) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}warehouse/ordersin/${companyID}/${token}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.getDeliveryItems = async (token, id) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}warehouse/deliveries/${companyID}/${token}/${id}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.getOrderItems = async (token, id) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}warehouse/ordersin/${companyID}/${token}/${id}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.readyDelivery = async (token, id) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}warehouse/deliveries/complete/${companyID}/${token}/${id}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.completeOrderIn = async (token, id) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}warehouse/ordersin/complete/${companyID}/${token}/${id}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.missingDelivery = async (token, orderid, itemid) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}warehouse/deliveries/missing/${companyID}/${token}/${orderid}/${itemid}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.missingOrderIn = async (token, orderid, itemid) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}warehouse/ordersin/missing/${companyID}/${token}/${orderid}/${itemid}`;
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