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

const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log(`quiz-api listening on port ${port}`);
});
