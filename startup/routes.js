const express = require('express');
const user = require('../routes/user');
const upload = require('../routes/upload');
const time = require('../routes/time');
const pokemon = require('../routes/pokemon');
const invalid = require('../routes/invalid');
const fileUpload = require('express-fileupload');

module.exports = function(app) {
    app.use(express.json());
    app.use(fileUpload({createParentPath: true}));
    app.use('/user', user);
    app.use('/upload', upload);
    app.use('/time', time);
    app.use('/pokemon', pokemon);
    app.use('*', invalid);
}
