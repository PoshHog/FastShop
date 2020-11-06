const express = require('express');
require('express-async-errors');
const cors = require('cors');
const dbmanager = require('./services/db-manager');

// This allows us to read environment variables from the .env file
// (But, when the system runs in the cloud, it won't use the file)
const dotenv = require('dotenv');
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

    // TODO : 1. Check user exists and get ID & name, 2. create new session, 3. identify role, 4. return token

    const ret = {'login':'valid', 'id':'1', 'name':'name', 'roles':['warehouse'], 'token':'somehash'};
    res.status(200).json(ret);
});

// Register a user
app.get('/register/:companyID/:email/:password/:fn/:sn/:num', async (req, res) => {
    const companyID = req.params.companyID;
    const email = req.params.email;
    const password = req.params.password;
    const forename = req.params.fn;
    const surname = req.params.sn;
    const num = req.params.num;


    // TODO : 1. Check user exists, 2. create new user, 3. create new account, 4. create session, 5. return token

    const ret = {'register':'valid', 'id':'1', 'token':'somehash'};
    res.status(200).json(ret);
});

// Get account for company with given email
app.get('/admin/:companyID/:token/:email', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;

    // TODO : 1. Validate token as admin, 2. collect role info for email, 3. return info

    const ret = {'token':'valid', 'accountid':'1', 'roles':[{'id':'1', 'name':'customerservice'}, {'id':'2', 'name':'warehouse'}]};
    res.status(200).json(ret);
});

// Remove role for account for company
app.post('/admin/remove/:companyID/:token/:accountid/:roleid', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const accountid = req.params.accountid;
    const roleid = req.params.roleid;

    // TODO : 1. Validate token as admin, 2. remove role for id

    const ret = {'token':'valid'};
    res.status(200).json(ret);
});

// Add role for account for company
app.post('/admin/add/:companyID/:token/:accountid/:roleid', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const accountid = req.params.accountid;
    const roleid = req.params.roleid;

    // TODO : 1. Validate token as admin, 2. add role for id

    const ret = {'token':'valid'};
    res.status(200).json(ret);
});

// Get all available role types
app.get('/admin/roles', async (req, res) => {
    
    // TODO : 1. Retrieve all role types, 2. return them

    const ret = {'roles':[{'id':'1', 'name':'customerservice'},{'id':'2', 'name':'warehouse'},{'id':'3', 'name':'courier'}]};
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

    // TODO : 1. Validate token as customer service, 2. search for accounts by email (if provided), 3. search for accounts by other means, 4. return result

    const ret = {'token':'valid', 'customers':[ {'id':'1', 'fn':'Test', 'sn':'first', 'email':'example@example.com', 'num':'', 'l1':'1', 'postcode':'NG13 5AD'},
                                                {'id':'2', 'fn':'Test', 'sn':'second', 'email':'example2@example.com', 'num':'', 'l1':'', 'postcode':''},
                                                {'id':'3', 'fn':'Test', 'sn':'third', 'email':'example3@example.com', 'num':'', 'l1':'', 'postcode':''}]};
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

    // TODO : 1. Validate token as customer/service, 2. alter account by id

    const ret = {'token':'valid'};
    res.status(200).json(ret);
});

// Search for a customers orders
app.get('/search/orders/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const customerID = req.params.id;

    // TODO : 1. Validate token as customer/service, 2. search for orders by accountID, 3. return result

    const ret = {'token':'valid', 'orders':[{'id':'1', 'date':'03-11-2020', 'l1':'1', 'postcode':'NG13 5AD', 'status':'complete'},
                                            {'id':'2', 'date':'04-11-2020', 'l1':'2', 'postcode':'NG13 8PH', 'status':'out for delivery'},
                                            {'id':'3', 'date':'04-11-2020', 'l1':'2', 'postcode':'NG13 8PH', 'status':'warehouse'},
                                            {'id':'4', 'date':'05-11-2020', 'l1':'3', 'postcode':'NG13 8ZL', 'status':'processing'}]};
    res.status(200).json(ret);
});

// Edit an orders details
app.post('/update/order/:companyID/:token/:id/:l1/:postcode', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const l1 = req.params.l1;
    const postcode = req.params.postcode;

    // TODO : 1. Validate token as customer/service, 2. alter order

    const ret = {'token':'valid'};
    res.status(200).json(ret);
});

// Cancel an order
app.post('/cancel/order/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;

    // TODO : 1. Validate token as customer/service, 2. cancel order

    const ret = {'token':'valid'};
    res.status(200).json(ret);
});

// Search for a customers order items
app.get('/search/orders/items/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const orderID = req.params.id;

    // TODO : 1. Validate token as customer/service, 2. search for items by orderID, 3. return result

    const ret = {'token':'valid', 'items':[{'id':'1', 'name':'Top', 'quantity':'1'},
                                            {'id':'2', 'name':'Jean', 'quantity':'2'},
                                            {'id':'3', 'name':'Fleece', 'quantity':'2'},
                                            {'id':'4', 'name':'Jogger', 'quantity':'3'}]};
    res.status(200).json(ret);
});

// Edit an orders details
app.post('/update/item/:companyID/:token/:id/:quantity', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;
    const quantity = req.params.quantity;
    const postcode = req.params.postcode;

    // TODO : 1. Validate token as customer/service, 2. alter item

    const ret = {'token':'valid'};
    res.status(200).json(ret);
});

// Cancel an order
app.post('/cancel/item/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;

    // TODO : 1. Validate token as customer/service, 2. cancel item

    const ret = {'token':'valid'};
    res.status(200).json(ret);
});

// Outgoing deliveries
app.get('/warehouse/deliveries/:companyID/:token', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;

    // TODO : 1. Validate token as warehouse, 2. get outgoing deliveries, 3. return them

    const ret = {'token':'valid', 'deliveries':[
        {'id':'1'},
        {'id':'2'},
        {'id':'3'}
    ]};
    res.status(200).json(ret);
});

// Incoming orders
app.get('/warehouse/ordersin/:companyID/:token', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;

    // TODO : 1. Validate token as warehouse, 2. get incoming orders, 3. return them

    const ret = {'token':'valid', 'ordersIn':[
        {'id':'1'},
        {'id':'2'},
        {'id':'3'}
    ]};
    res.status(200).json(ret);
});

// Outgoing delivery items
app.get('/warehouse/deliveries/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;

    // TODO : 1. Validate token as warehouse, 2. get an outgoing deliveries items, 3. return them

    const ret = {'token':'valid', 'deliveryItems':[
        {'id':'1', 'name':'Pot', 'quantity':'2'},
        {'id':'2', 'name':'Tree', 'quantity':'2'},
        {'id':'3', 'name':'Feeder', 'quantity':'2'}
    ]};
    res.status(200).json(ret);
});

// Incoming order items
app.get('/warehouse/ordersin/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;

    // TODO : 1. Validate token as warehouse, 2. get an incoming orders items, 3. return them

    const ret = {'token':'valid', 'ordersInItems':[
        {'id':'1', 'name':'Pot', 'quantity':'2'},
        {'id':'2', 'name':'Tree', 'quantity':'2'},
        {'id':'3', 'name':'Feeder', 'quantity':'2'}
    ]};
    res.status(200).json(ret);
});

// Mark a delivery as ready to be shipped
app.post('/warehouse/deliveries/complete/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;

    // TODO : 1. Validate token as warehouse, 2. mark delivery ID as ready to be shipped

    const ret = {'token':'valid'};
    res.status(200).json(ret);
});

// Mark incoming order as all present
app.post('/warehouse/ordersin/complete/:companyID/:token/:id', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const id = req.params.id;

    // TODO : 1. Validate token as warehouse, 2. Mark a raised po as complete

    const ret = {'token':'valid', 'ordersInItems':[
        {'id':'1', 'name':'Pot', 'quantity':'2'},
        {'id':'2', 'name':'Tree', 'quantity':'2'},
        {'id':'3', 'name':'Feeder', 'quantity':'2'}
    ]};
    res.status(200).json(ret);
});

// Mark a item on an outgoing delivery as not deliverable
app.post('/warehouse/deliveries/missing/:companyID/:token/:orderid/:itemid', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const orderid = req.params.orderid;
    const itemid = req.params.itemid;

    // TODO : 1. Validate token as warehouse, 2. add item to new delivery to retry

    const ret = {'token':'valid'};
    res.status(200).json(ret);
});

// Mark incoming item as missing
app.post('/warehouse/ordersin/missing/:companyID/:token/:orderid/:itemid', async (req, res) => {
    const companyID = req.params.companyID;
    const token = req.params.token;
    const orderid = req.params.orderid;
    const itemid = req.params.itemid;

    // TODO : 1. Validate token as warehouse, 2. Flag

    const ret = {'token':'valid', 'ordersInItems':[
        {'id':'1', 'name':'Pot', 'quantity':'2'},
        {'id':'2', 'name':'Tree', 'quantity':'2'},
        {'id':'3', 'name':'Feeder', 'quantity':'2'}
    ]};
    res.status(200).json(ret);
});










































// Register a new customer
app.post('/quiz', async (req, res) => {
    const id = await quiz.saveQuizAsync(req.body);
    res.status(200).json({ id });
});

// Start a session
app.get('/quiz/:id', async (req, res) => {
    const id = req.params.id;
    const quizData = await quiz.getQuizAsync(id);
    res.status(200).json(quizData);
});

// End a session
app.delete('/quiz/:id', async (req, res) => {
    const id = req.params.id;
    await quiz.deleteQuizAsync(id);
    res.status(200).end();
});

// Add a test customer
app.get('/test', async (req, res) => {
    const addcust = await dbmanager.addCustomer(1, "test@test.test", "test", "testy", "mctestface");
    res.status(200).json(addcust);
});

// Add a product
app.post('/host/:id', async (req, res) => {
    const id = req.params.id;
    const roomCode = await quiz.hostQuizAsync(id);
    const state = await quiz.getStateAsync(roomCode);
    res.status(200).json(state);
});

// Make a transaction
app.post('/join/:roomCode', async (req, res) => {
    const roomCode = req.params.roomCode;
    const playerName = req.body.playerName;
    await quiz.joinQuizAsync(roomCode, playerName);
    const state = await quiz.getStateAsync(roomCode, playerName);
    res.status(200).json(state);
});

// Get all products
app.get('/state/:roomCode/:playerName?', async (req, res) => {
    const roomCode = req.params.roomCode;
    const playerName = req.params.playerName;
    const state = await quiz.getStateAsync(roomCode, playerName);
    res.status(200).json(state);
});

// Get a transaction
app.post('/next/:roomCode', async (req, res) => {
    const roomCode = req.params.roomCode;
    const finished = await quiz.nextStageAsync(roomCode);
    if (finished) {
        res.status(204).send('Room deleted');
        return;
    }
    const state = await quiz.getStateAsync(roomCode);
    res.status(200).json(state);
});

// Edit customer details
app.post('/answer/:roomCode/:playerName', async (req, res) => {
    const roomCode = req.params.roomCode;
    const playerName = req.params.playerName;
    const answer = req.body.answer;
    await quiz.submitAnswerAsync(roomCode, playerName, answer);
    const state = await quiz.getStateAsync(roomCode, playerName);
    res.status(200).json(state);
});

// Edit a transaction 
app.delete('/room/:roomCode', async (req, res) => {
    const roomCode = req.params.roomCode;
    await quiz.deleteRoomAsync(roomCode);
    res.status(200).end();
});

// Cancel a transaction
app.get('/version', (req, res) => {
    res.status(200).send({
        version: process.env.VERSION || 2
    });
});

// Edit a product

// Add a courier

// Edit a courier

// Add a delivery

// Edit a delivery

// Add a supplier

// Raise a PO

// View a PO

// View available roles

// Get customer roles

// Add roles for account

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
    console.log(`quiz-api listening on port ${port}`);
});
