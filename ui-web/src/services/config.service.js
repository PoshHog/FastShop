angular.module('app').factory('ConfigService', [function() {

    var service = {};

    service.companyID = 1;
    service.publicKey = 'a';//CryptoJS.enc.Hex.parse("1a2b3c4d5e6f71089")
    service.apiBase = 'http://fastshopmanagement-env.eba-3gskvf7w.us-west-2.elasticbeanstalk.com/';

    service.check = (value) =>{
        if(value==undefined || value.length<1){
            value = "-";
        }
        return value;
    }

    return service;
}]);