// use .env file variables
require('dotenv').config()

// Express server
const express = require('express');
const app = express();

// Middlewares of express server
app.use(express.json());
app.use('/players', require('./routes/players'));
app.use('/ranking', require('./routes/ranking'));
app.use('/games', require('./routes/games'));
app.use('/login', require('./routes/login'))
app.use(require('./routes/invalidRoute'));

// Create database if not exists
require('./services/createDatabase')();

// Start server
const PORT = process.env.API_PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
