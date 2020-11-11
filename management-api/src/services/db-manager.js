const connector = require('./db-solution/db-solution-connector');
const customerQueries = require('./customers/db-customer');

async function addCustomer(companyID, email, password, forename = null, surname = null, dob = null, mobile = null, countryCode = null, addressLine1 = null, postcode = null){
    id = await customerQueries.addCustomer(connector.con, companyID, email, password, forename, surname, dob, mobile, countryCode, addressLine1, postcode);
    return `{customer : ${id}}`;
}

// TODO : 1. Check user exists and get ID & name, 2. create new session, 3. identify role, 4. return token
async function logIn(companyID, email, password){

    return {'login':'valid', 'id':'1', 'name':'name', 'roles':['marketing'], 'token':'somehash'};
}


// TODO : 1. Check user exists, 2. create new user, 3. create new account, 4. create session, 5. return token
async function register(companyID, email, password, fn, sn, num){

    return {'register':'valid', 'id':'1', 'token':'somehash'};
}


// TODO : 1. Validate token as admin, 2. collect role info for email, 3. return info
async function getAccount(companyID, token, email){

    return {'token':'valid', 'accountid':'1', 'roles':[{'id':'1', 'name':'customerservice'}, {'id':'2', 'name':'warehouse'}]};
}

// TODO : 1. Validate token as admin, 2. remove role for id
async function removeRole(companyID, token, accountid, roleid){

    return {'token':'valid'};
}


// TODO : 1. Validate token as admin, 2. add role for id
async function addRole(companyID, token, accountid, roleid){

    return {'token':valid};
}

// TODO : 1. Retrieve all role types, 2. return them
async function getRoles(){

    return {'roles':[{'id':'1', 'name':'customerservice'},{'id':'2', 'name':'warehouse'},{'id':'3', 'name':'courier'}]};
}


// TODO : 1. Validate token as customer service, 2. search for accounts by email (if provided), 3. search for accounts by other means, 4. return result
async function searchAccount(companyID, token, email, fn, sn, num, postcode){


    return {'token':'valid', 'customers':[ {'id':'1', 'fn':'Test', 'sn':'first', 'email':'example@example.com', 'num':'', 'l1':'1', 'postcode':'NG13 5AD'},
    {'id':'2', 'fn':'Test', 'sn':'second', 'email':'example2@example.com', 'num':'', 'l1':'', 'postcode':''},
    {'id':'3', 'fn':'Test', 'sn':'third', 'email':'example3@example.com', 'num':'', 'l1':'', 'postcode':''}]};
}

// TODO : 1. Validate token as customer/service, 2. alter account by id
async function updateCustomer(companyID, token, customerid, fn, sn, email, num, l1, postcode){

    return {'token':'valid'}
}

// TODO : 1. Validate token as customer/service, 2. search for orders by accountID, 3. return result
async function getCustomerOrders(companyID, token, customerid){
    
    return {'token':'valid', 'orders':[{'id':'1', 'date':'03-11-2020', 'l1':'1', 'postcode':'NG13 5AD', 'status':'complete'},
    {'id':'2', 'date':'04-11-2020', 'l1':'2', 'postcode':'NG13 8PH', 'status':'out for delivery'},
    {'id':'3', 'date':'04-11-2020', 'l1':'2', 'postcode':'NG13 8PH', 'status':'warehouse'},
    {'id':'4', 'date':'05-11-2020', 'l1':'3', 'postcode':'NG13 8ZL', 'status':'processing'}]};
}


// TODO : 1. Validate token as customer/service, 2. alter order
async function editTransaction(companyID, token, transactionID, destL1, destPostcode){

    return {'token':'valid'};
}

// TODO : 1. Validate token as customer/service, 2. cancel order
async function cancelTransaction(companyID, token, transactionID){

    return {'token':'valid'};
}


// TODO : 1. Validate token as customer/service, 2. search for items by orderID, 3. return result
async function getTransactionItems(companyID, token, transactionID){

    return {'token':'valid', 'items':[{'id':'1', 'name':'Top', 'quantity':'1'},
    {'id':'2', 'name':'Jean', 'quantity':'2'},
    {'id':'3', 'name':'Fleece', 'quantity':'2'},
    {'id':'4', 'name':'Jogger', 'quantity':'3'}]};
}


// TODO : 1. Validate token as customer/service, 2. alter item
async function updateCustomerOrder(companyID, token, COID, quantity){

    return {'token':'valid'};
}

// TODO : 1. Validate token as customer/service, 2. cancel item
async function cancelCustomerOrder(companyID, token, COID){

    return {'token':'valid'};
}


// TODO : 1. Validate token as warehouse, 2. get outgoing deliveries, 3. return them
async function getOutgoingDeliveries(companyID, token){

    return {'token':'valid', 'deliveries':[
        {'id':'1'},
        {'id':'2'},
        {'id':'3'}
    ]};
}


// TODO : 1. Validate token as warehouse, 2. get incoming orders, 3. return them
async function getIncomingOrders(companyID, token){

    return {'token':'valid', 'deliveries':[
        {'id':'1'},
        {'id':'2'},
        {'id':'3'}
    ]};
}


// TODO : 1. Validate token as warehouse, 2. get an outgoing deliveries items, 3. return them
async function getOutgoingDeliveryItems(companyID, token, id){

    return {'token':'valid', 'deliveryItems':[
        {'id':'1', 'name':'Pot', 'quantity':'2'},
        {'id':'2', 'name':'Tree', 'quantity':'2'},
        {'id':'3', 'name':'Feeder', 'quantity':'2'}
    ]};
}


// TODO : 1. Validate token as warehouse, 2. get an incoming orders items, 3. return them
async function getIncomingOrderItems(companyID, token, id){

    return {'token':'valid', 'ordersInItems':[
        {'id':'1', 'name':'Pot', 'quantity':'2'},
        {'id':'2', 'name':'Tree', 'quantity':'2'},
        {'id':'3', 'name':'Feeder', 'quantity':'2'}
    ]};
}


// TODO : 1. Validate token as warehouse, 2. mark delivery ID as ready to be shipped
async function markDeliveryAsReady(companyID, token, transactionID){

    return {'token':'valid'};
}


// TODO : 1. Validate token as warehouse, 2. Mark a raised po as complete
async function markOrderAsPresent(companyID, token, POID){

    return {'token':'valid'};
}

// TODO : 1. Validate token as warehouse, 2. add item to new delivery to retry
async function markDeliveryItemAsMissing(companyID, token, transactionID, itemID){

    return {'token':'valid'};
}


// TODO : 1. Validate token as warehouse, 2. flag 
async function markOrderItemAsMissing(companyID, token, POID, itemID){

    return {'token':'valid'};
}


// TODO : 1. Validate token as courier, 2. get unassigned deliveries, 3. return them
async function getUnassignedDeliveries(companyID, token){

    return {'token':'valid', 'deliveries':[
        {'id':'1', 'pickup':'d1', 'dropoff':'p1'},
        {'id':'2', 'pickup':'d2', 'dropoff':'p2'},
        {'id':'3', 'pickup':'d3', 'dropoff':'p3'}
    ]};
}


// TODO : 1. Validate token as courier, 2. get shedule, 3. return it
async function getDriverSchedule(companyID, token){

    return {'token':'valid', 'schedule':[
        {'id':'1', 'pickup':'d4', 'dropoff':'p4'},
        {'id':'2', 'pickup':'d5', 'dropoff':'p5'},
        {'id':'3', 'pickup':'d6', 'dropoff':'p6'}
    ]};
}


// TODO : 1. Validate token as courier, 2. get all deliveries items, 3. return them
async function getScheduleItems(companyID, token, deliveryID){

    return {'token':'valid', 'deliveryItems':[
        {'id':'1', 'name':'Pot', 'quantity':'2'},
        {'id':'2', 'name':'Tree', 'quantity':'2'},
        {'id':'3', 'name':'Feeder', 'quantity':'2'}
    ]};
}


// TODO : 1. Validate token as courier, 2. accept delivery, 3. return them
async function acceptDelivery(companyID, token, deliveryID){

    return {'token':'valid'};
}


// TODO : 1. Validate token as courier, 2. mark delivery ID as complete
async function completeDelivery(companyID, token, deliveryID){

    return {'token':'valid'};
}


// TODO : 1. Validate token as courier, 2. add item to new delivery to retry
async function markCourierItemMissing(companyID, token, orderID, itemID){

    return {'token':'valid'};
}


// TODO : 1. Validate token as marketing, 2. search for all companies matchig name or description 3. return company info
async function searchCompany(companyID, token, criteria){

    return {'token':'valid', 'suppliers':[
        {'id':'1', 'name':'company1', 'desc':'A company supplying X', 'cc':'44', 'num':'7777777777'},
        {'id':'2', 'name':'company2', 'desc':'A company supplying Y', 'cc':'44', 'num':'7777777778'},
        {'id':'3', 'name':'company3', 'desc':'A company supplying Z', 'cc':'44', 'num':'7777777779'}
    ]};
}


// TODO : 1. Validate token as marketing, 2. get own inventory 3. return
async function getCurrentInventory(companyID, token){

    return {'token':'valid', 'items':[
        {'id':'1', 'name':'item1', 'desc':'An item', 'quantity':'10', 'price':'15.99'},
        {'id':'2', 'name':'item2', 'desc':'An item', 'quantity':'5', 'price':'26.99'},
        {'id':'3', 'name':'item3', 'desc':'An item', 'quantity':'18', 'price':'3.99'}
    ]};
}


// TODO : 1. Validate token as marketing, 2. get 'id's' inventory 3. return
async function getInventory(companyID, token, searchCompanyID){

    return {'token':'valid', 'items':[
        {'id':'1', 'name':'item1', 'desc':'An item', 'quantity':'10', 'price':'15.99'},
        {'id':'2', 'name':'item2', 'desc':'An item', 'quantity':'5', 'price':'26.99'},
        {'id':'3', 'name':'item3', 'desc':'An item', 'quantity':'18', 'price':'3.99'}
    ]};
}


// TODO : 1. Validate token as marketing, 2. Add supplier
async function addSupplier(companyID, token, name, desc, cc, num, l1, postcode){

    return {'token':'valid'};
}


// TODO : 1. Validate token as marketing, 2. Edit the item
async function editInventory(companyID, token, inventoryID, name, desc, quantity, price, weight, barcode){

    return {'token':'valid'};
}


// TODO : 1. Validate token as marketing, 2. Add the item
async function addInventory(companyID, token, supplyCompanyID, name, desc, quantity, price, weight, barcode){

    return {'token':'valid'};
}


// TODO : 1. Validate token as marketing, 2. Order the quantity of the item through the pipeline
async function orderItem(companyID, token, inventoryID, quantity){

    return {'token':'valid'};
}

module.exports = {
    addCustomer,
    logIn,
    register,
    getAccount,
    removeRole,
    addRole,
    getRoles,
    searchAccount,
    updateCustomer,
    getCustomerOrders,
    editTransaction,
    cancelTransaction,
    getTransactionItems,
    updateCustomerOrder,
    cancelCustomerOrder,
    getOutgoingDeliveries,
    getIncomingOrders,
    getOutgoingDeliveryItems,
    getIncomingOrderItems,
    markDeliveryAsReady,
    markOrderAsPresent,
    markDeliveryItemAsMissing,
    markOrderItemAsMissing,
    getUnassignedDeliveries,
    getDriverSchedule,
    getScheduleItems,
    acceptDelivery,
    completeDelivery,
    markCourierItemMissing,
    searchCompany,
    getCurrentInventory,
    getInventory,
    addSupplier, 
    editInventory, 
    addInventory, 
    orderItem
}