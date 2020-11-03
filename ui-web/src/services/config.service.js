angular.module('app').factory('ConfigService', [function() {

    var service = {};

    service.companyID = 1;
    service.publicKey = 'a';//CryptoJS.enc.Hex.parse("1a2b3c4d5e6f71089")
    service.apiBase = 'https://qa-quiz-api.us-west-2.elasticbeanstalk.com/';

    return service;
}]);