angular.module('app').
factory('LoginService', ['$http', 'ConfigService', function($http, ConfigService) {

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

    service.login = async (email, password) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        //const cryptEmail = CryptoJS.AES.encrypt(email, ConfigService.publicKey);
        //const cryptPass = CryptoJS.AES.encrypt(password, ConfigService.publicKey);
        const url = `${base}login/${companyID}/${email}/${password}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.register = async (email, password, fn, sn, num) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        //const cryptEmail = CryptoJS.AES.encrypt(email, ConfigService.publicKey);
        //const cryptPass = CryptoJS.AES.encrypt(password, ConfigService.publicKey);
        const url = `${base}register/${companyID}/${ConfigService.check(email)}/${ConfigService.check(password)}/${ConfigService.check(fn)}/${ConfigService.check(sn)}/${ConfigService.check(num)}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.updateCustomer = async (token, id, fn, sn, email, num, l1, postcode) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        //const cryptEmail = CryptoJS.AES.encrypt(email, ConfigService.publicKey);
        //const cryptPass = CryptoJS.AES.encrypt(password, ConfigService.publicKey);
        const url = `${base}update/customer/${companyID}/${token}/${id}/${ConfigService.check(fn)}/${ConfigService.check(sn)}/${ConfigService.check(email)}/${ConfigService.check(num)}/${ConfigService.check(l1)}/${ConfigService.check(postcode)}`;
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