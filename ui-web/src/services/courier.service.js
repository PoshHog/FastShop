angular.module('app').
factory('AdminService', ['$http', 'ConfigService', function($http, ConfigService) {

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

    service.getAvailableDeliveries = async (token) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}courier/deliveries/available/${companyID}/${token}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.getSchedule = async (token) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}courier/deliveries/schedule/${companyID}/${token}`;
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

        const url = `${base}courier/deliveries/items/${companyID}/${token}/${id}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.acceptDelivery = async (token, id) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}courier/deliveries/accept/${companyID}/${token}/${id}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.completeDelivery = async (token, id) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}courier/deliveries/complete/${companyID}/${token}/${id}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.missingItemOnDelivery = async (token, orderid, itemid) =>{
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;

        const url = `${base}courier/deliveries/missing/${companyID}/${token}/${orderid}/${itemid}`;
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