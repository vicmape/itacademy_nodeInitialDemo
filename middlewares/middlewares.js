const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')

// Middleware for express validator
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

// Middleware for authentication
const authentication = async (req, res, next) => {
    // There is only one administrator.
    // It is stored in plain text here. 
    // We will store this info in a DB in the Chat exercice
    const admin = {
        username: "victor",
        password: "123456",
        hashedPassword: "$2b$10$.NsUV4KYZ.VwYKr5u/FLCOHm3kgnru2SPrTTuZi/hvhrWo53jxgOq"
    }

    if ( req.body.username !== admin.username ||
         ! await bcrypt.compare(req.body.password, admin.hashedPassword)) {
            
        return res.status(400).send({
            status: 'fail',
            message: "Wrong credentials"
        })
    }

    next()
}


module.exports = {validation, authentication};