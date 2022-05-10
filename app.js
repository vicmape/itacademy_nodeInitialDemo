const express = require('express');

require('dotenv').config()

const app = express();

// Routes
require('./startup/routes')(app);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));