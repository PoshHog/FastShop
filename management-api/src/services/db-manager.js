const connector = require('./db-solution/db-solution-connector');
const customerQueries = require('./customers/db-customer');

async function addCustomer(companyID, email, password, forename = null, surname = null, dob = null, mobile = null, countryCode = null, addressLine1 = null, postcode = null){
    id = await customerQueries.addCustomer(connector.con, companyID, email, password, forename, surname, dob, mobile, countryCode, addressLine1, postcode);
    return `{customer : ${id}}`;
}

module.exports = {
    addCustomer
}