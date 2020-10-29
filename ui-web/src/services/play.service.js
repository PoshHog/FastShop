angular.module('app').
factory('PlayService', ['$http', 'ConfigService', function($http, ConfigService) {

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

    service.joinQuiz = async (roomCode, playerName) => {
        const base = ConfigService.apiBase;
        const url = `${base}join/${encodeURIComponent(roomCode)}`;
        const data = { playerName: playerName };
        try {
            const response = await $http.post(url, data);
            const state = response.data;
            return state;
        } catch (error) {
            handleError(error);
        }
    }

    service.getState = async function(roomCode, playerName) {
        const base = ConfigService.apiBase;
        const url = `${base}state/${encodeURIComponent(roomCode)}/${encodeURIComponent(playerName)}`;
        try {
            const response = await $http.get(url);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    service.submitAnswer = async (roomCode, playerName, letter) => {
        const base = ConfigService.apiBase;
        const url = `${base}answer/${encodeURIComponent(roomCode)}/${encodeURIComponent(playerName)}`;
        const data = { answer: letter };
        try {
            const response = await $http.post(url, data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    return service;
}]);