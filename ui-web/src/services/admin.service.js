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

    service.getAccount = async (token, email) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}admin/${companyID}/${token}/${email}`;
        try {
            const response = await $http.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            handleError(error);
        }
    }

    service.removeRole = async (accountid, roleid) => {
        const base = ConfigService.apiBase;
        const companyID = ConfigService.companyID;
        const url = `${base}admin/${companyID}/${token}/${accountid}/${roleid}`;
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