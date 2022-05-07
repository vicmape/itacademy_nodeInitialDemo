const cors = require('cors');

module.exports = function(req, res, next) {
    cors();
    next();
};

