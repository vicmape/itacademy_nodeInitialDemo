// Express server
const express = require('express');
const app = express();

// Routes
const players = require('./routes/players');
const login = require('./routes/login');
const invalidRoute = require('./routes/invalidRoute');

// JWT
const jwt = require('jsonwebtoken');

// use .env file variables
require('dotenv').config()

// Middlewares of express server
app.use(express.json());
app.use('/players', players);
app.use('/login', login)
app.use(invalidRoute);

// Start server
const PORT = process.env.API_PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));