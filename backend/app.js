require('dotenv').config();

const express = require('express')
const cors = require('cors')

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

// Create Database if not exists
require('./models/models.js')();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/auth', require('./routes/auth'));
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));

// Sockets
require('./sockets/sockets')(io);

PORT = process.env.API_PORT || 8080
server.listen(PORT, console.log(`Server running at http://localhost:${PORT}...`));