const express = require('express');
require('express-async-errors');
const cors = require('cors');
const dbmanager = require('./services/db-manager');

// This allows us to read environment variables from the .env file
// (But, when the system runs in the cloud, it won't use the file)
const dotenv = require('dotenv');
const { editTransaction } = require('./services/db-manager');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// This is just for SSL certificate verification!
app.use('/.well-known/pki-validation', express.static('src/pki-validation/'));

function check(value){
    if(value == "-"){
        value = null;
    }
    return value;
}

// Log a user in
app.get('/login/:companyID/:email/:password', async (req, res) => {
    const companyID = req.params.companyID;
    const email = req.params.email;
    const password = req.params.password;
    await dbmanager.logIn(res, companyID, email, password);
});

// Register a user
app.get('/register/:companyID/:email/:password/:fn/:sn/:num', async (req, res) => {
    const companyID = req.params.companyID;
    const email = req.params.email;
    const password = req.params.password;
    const forename = req.params.fn;
    const surname = req.params.sn;
    const num = req.params.num;
    await dbmanager.register(res, companyID, email, password, forename, surname, num);
});

// Get account for company with given email
app.get('/admin/:companyID/:token/:email', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const email = req.params.email;
    await dbmanager.getAccount(res, companyID, token, email);
});

// Remove role for account for company
app.post('/admin/remove/:companyID/:token/:accountid/:roleid', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const accountid = req.params.accountid;
    const roleid = req.params.roleid;
    const ret = await dbmanager.removeRole(companyID, token, accountid, roleid);
    res.status(200).json(ret);
});

// Add role for account for company
app.post('/admin/add/:companyID/:token/:accountid/:roleid', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const accountid = req.params.accountid;
    const roleid = req.params.roleid;
    await dbmanager.addRole(companyID, token, accountid, roleid);
    res.status(200).json(ret);
});

// Get all available role types
app.get('/admin/roles', async (req, res) => {
    const ret = await dbmanager.getRoles();
    res.status(200).json(ret);
});

// Search for customer
app.get('/customerservice/search/:companyID/:token/:email/:fn/:sn/:num/:postcode', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const email = req.params.email;
    const fn = req.params.fn;
    const sn = req.params.sn;
    const num = req.params.num;
    const postcode = req.params.postcode;
    const ret = await dbmanager.searchAccount(companyID, token, email, fn, sn, num, postcode);
    res.status(200).json(ret);
});

// Edit a customers details
app.post('/update/customer/:companyID/:token/:id/:fn/:sn/:email/:num/:l1/:postcode', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const email = req.params.email;
    const fn = req.params.fn;
    const sn = req.params.sn;
    const num = req.params.num;
    const l1 = req.params.l1;
    const postcode = req.params.postcode;
    const ret = await dbmanager.updateCustomer(companyID, token, id, email, fn, sn, num, l1, postcode);
    res.status(200).json(ret);
});

// Search for a customers orders
app.get('/search/orders/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const customerID = req.params.id;
    const ret = await dbmanager.getCustomerOrders(companyID, token, customerID);
    res.status(200).json(ret);
});

// Edit an orders details
app.post('/update/order/:companyID/:token/:id/:l1/:postcode', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const l1 = req.params.l1;
    const postcode = req.params.postcode;
    const ret = await dbmanager.editTransaction(companyID, token, id, l1, postcode);
    res.status(200).json(ret);
});

// Cancel an order
app.post('/cancel/order/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const ret = await dbmanager.cancelTransaction(companyID, token, id);
    res.status(200).json(ret);
});

// Search for a customers order items
app.get('/search/orders/items/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const orderID = req.params.id;
    const ret = await dbmanager.getTransactionItems(companyID, token, orderID);
    res.status(200).json(ret);
});

// Edit an orders details
app.post('/update/item/:companyID/:token/:id/:quantity', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const quantity = req.params.quantity;
    const ret = await dbmanager.updateCustomerOrder(companyID, token, id, quantity);
    res.status(200).json(ret);
});

// Cancel an order
app.post('/cancel/item/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const ret = await dbmanager.cancelCustomerOrder(companyID, token, id);
    res.status(200).json(ret);
});

// Outgoing deliveries
app.get('/warehouse/deliveries/:companyID/:token', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const ret = await dbmanager.getOutgoingDeliveries(companyID, token);
    res.status(200).json(ret);
});

// Incoming orders
app.get('/warehouse/ordersin/:companyID/:token', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const ret = await dbmanager.getIncomingOrders(companyID, token);
    res.status(200).json(ret);
});

// Outgoing delivery items
app.get('/warehouse/deliveries/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const ret = await dbmanager.getOutgoingDeliveryItems(companyID, token, id);
    res.status(200).json(ret);
});

// Incoming order items
app.get('/warehouse/ordersin/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const ret = await dbmanager.getIncomingOrderItems(companyID, token, id);
    res.status(200).json(ret);
});

// Mark a delivery as ready to be shipped
app.post('/warehouse/deliveries/complete/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const ret = await dbmanager.markDeliveryAsReady(companyID, token, id);
    res.status(200).json(ret);
});

// Mark incoming order as all present
app.post('/warehouse/ordersin/complete/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;

    const ret = await dbmanager.markOrderAsPresent(companyID, token, id);
    res.status(200).json(ret);
});

// Mark a item on an outgoing delivery as not deliverable
app.post('/warehouse/deliveries/missing/:companyID/:token/:orderid/:itemid', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const orderID = req.params.orderid;
    const itemid = req.params.itemid;
    const ret = await dbmanager.markDeliveryItemAsMissing(companyID, token, orderID, itemid);
    res.status(200).json(ret);
});

// Mark incoming item as missing
app.post('/warehouse/ordersin/missing/:companyID/:token/:orderid/:itemid', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const orderID = req.params.orderid;
    const itemid = req.params.itemid;
    const ret = await dbmanager.markOrderItemAsMissing(companyID, token, orderID, itemid)
    res.status(200).json(ret);
});


// Unassigned deliveries
app.get('/courier/deliveries/available/:companyID/:token', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const ret = await dbmanager.getUnassignedDeliveries(companyID, token);
    res.status(200).json(ret);
});

// Schedule of deliveries
app.get('/courier/deliveries/schedule/:companyID/:token', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const ret = await dbmanager.getDriverSchedule(companyID, token);
    res.status(200).json(ret);
});

// Schedules delivery items
app.get('/courier/deliveries/items/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const ret = await dbmanager.getScheduleItems(companyID, token, id);
    res.status(200).json(ret);
});

// Accept a delivery
app.post('/courier/deliveries/accept/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const ret = await dbmanager.acceptDelivery(companyID, token, id);
    res.status(200).json(ret);
});

// Mark a delivery as complete
app.post('/courier/deliveries/complete/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const ret = await dbmanager.completeDelivery(companyID, token, id);
    res.status(200).json(ret);
});

// Mark a item while out for delivery as missing
app.post('/courier/deliveries/missing/:companyID/:token/:orderid/:itemid', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const orderid = req.params.orderid;
    const itemid = req.params.itemid;
    const ret = await dbmanager.markCourierItemMissing(companyID, token, orderid, itemid);
    res.status(200).json(ret);
});

// Search for companies
app.get('/company/search/:companyID/:token/:criteria', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const criteria = req.params.criteria;
    const ret = await dbmanager.searchCompany(companyID, token, criteria);
    res.status(200).json(ret);
});

// Get the website companies inventory
app.get('/company/inventory/:companyID/:token', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const ret = await dbmanager.getCurrentInventory(companyID, token);
    res.status(200).json(ret);
});

// Get another companies inventory
app.get('/company/inventory/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.token;
    const ret = await dbmanager.getInventory(companyID, token, id);
    res.status(200).json(ret);
});

// Add a supplier
app.post('/company/add/:companyID/:token/:name/:desc/:cc/:num/:l1/:postcode', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const name = req.params.name;
    const desc = req.params.desc;
    const cc = req.params.cc;
    const num = req.params.num;
    const l1 = req.params.l1;
    const poscode = req.params.poscode;
    const ret = await dbmanager.addSupplier(companyID, token, name, desc, cc, num, l1, postcode);
    res.status(200).json(ret);
});

// Edit an inventory item
app.post('/company/inventory/edit/:companyID/:token/:id/:name/:desc/:quantity/:price/:weight/:barcode', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const inventoryID = req.params.id;
    const name = req.params.name;
    const desc = req.params.desc;
    const quantity = req.params.quantity;
    const price = req.params.price;
    const weight = req.params.weight;
    const barcode = req.params.barcode;
    const ret = await dbmanager.editInventory(companyID, token, inventoryID, name, desc, quantity, price, weight, barcode);
    res.status(200).json(ret);
});

// Add an inventory item
app.post('/company/inventory/add/:companyID/:token/:id/:name/:desc/:quantity/:price/:weight/:barcode', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const supplyCompanyID = req.params.id;
    const name = req.params.name;
    const desc = req.params.desc;
    const quantity = req.params.quantity;
    const price = req.params.price;
    const weight = req.params.weight;
    const barcode = req.params.barcode;
    const ret = await dbmanager.editInventory(companyID, token, supplyCompanyID, name, desc, quantity, price, weight, barcode);
    res.status(200).json(ret);
});

// Order an item
app.post('/company/inventory/order/:companyID/:token/:id/:quantity', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const inventoryID = req.params.id;
    const quantity = req.params.quantity;
    const ret = await dbmanager.orderItem(companyID, token, inventoryID, quantity);
    res.status(200).json(ret);
});

// Catch-all handler
app.all('*', (req, res) => {
    res.status(400).json({
        error: 'No API handler for URL'        
    });
});

// Use a better error handler
app.use((err, req, res, next) => {
    switch (err.name) {
        case 'NotFoundError':
            res.status(404);
            break;
        case 'InvalidOperationError':
        case 'ValidationError':
            res.status(400);
            break;
        default:
            res.status(500);
            break;
    }
    res.json({ error: err.message });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`management-api listening on port ${port}`);
});
