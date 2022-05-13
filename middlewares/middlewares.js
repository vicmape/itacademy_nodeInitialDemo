const { validationResult } = require('express-validator');

const validation = ( req, res, next ) => {

    const error = validationResult(req);
    if ( !error.isEmpty()) {
        return res.status(400).send({
            status: 'fail',
            error
        })
    }
    next();
}

module.exports = {validation};