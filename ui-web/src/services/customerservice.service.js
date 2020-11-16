angular.module('app').
factory('CustomerserviceService', ['$http', 'ConfigService', function($http, ConfigService) {

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

    service.search = async (token, email, fn, sn, num, postcode) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}customerservice/search/${companyID}/${token}/${email}/${fn}/${sn}/${num}/${postcode}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.getOrders = async (token, id) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}search/orders/${companyID}/${token}/${id}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.editOrder = async (token, id, l1, postcode) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}update/order/${companyID}/${token}/${id}/${l1}/${postcode}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }
    
    service.cancelOrder = async (token, id) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}cancel/order/${companyID}/${token}/${id}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.viewItems = async (token, id) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}search/orders/items/${companyID}/${token}/${id}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.editItem = async (token, id, quantity) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}update/item/${companyID}/${token}/${id}/${quantity}`;
        try {
            const response = await $http.post(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }
    
    service.cancelItem = async (token, id) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}cancel/item/${companyID}/${token}/${id}`;
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