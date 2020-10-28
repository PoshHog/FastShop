const connector = require('./db-solution/db-solution-connector');
const customerQueries = require('./db-solution/customers/db-customer');

async function addCustomer(companyID, email, password, forename = null, surname = null, dob = null, mobile = null, countryCode = null, addressLine1 = null, postcode = null){
    customerQueries.addCustomer(connector.con, companyID, email, password, forename, surname, dob, mobile, countryCode, addressLine1, postcode);
    return "{customer : 'added'}";
}

module.exports = {
    addCustomer
}