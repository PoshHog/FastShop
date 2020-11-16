const sessionConnect = require('./db-session-connect');
const sessionDisconnect = require('./db-session-disconnect');
const sessionValidate = require('./db-session-validate');

// TODO : 1. Check user exists and get ID & name, 2. create new session, 3. identify role, 4. return token
async function logIn(res, connection, companyID, email, password){    
    await sessionConnect.logIn(res, connection, companyID, email, password);
}

async function addCustomer(res, companyID, email, password, forename = null, surname = null, dob = null, mobile = null, countryCode = null, addressLine1 = null, postcode = null){
    id = await sessionConnect.addCustomer(connector.con, companyID, email, password, forename, surname, dob, mobile, countryCode, addressLine1, postcode);
    return await logIn(res, connector.con, companyID, email, password);
}

module.exports = {
    logIn,
    addCustomer
}