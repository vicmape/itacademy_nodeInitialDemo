const express = require('express');
const db = require('./config/database');

require('dotenv').config()

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app = express();

// Routes
require('./startup/routes')(app);

app.use(function(req,res){
    res.send(404);
});

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));