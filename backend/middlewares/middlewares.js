require('dotenv').config();

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Users = require('mongoose').model("Users")

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

    // Check if user exists
    const user = await Users.find({userName: req.body.userName});
    if(!user.length) return res.status(400).send({ status: "fail", message: `user ${req.body.userName} not registered`});

    // Check if the password is right
    if ( ! await bcrypt.compare(req.body.password, user[0].password)) {
        return res.status(400).send({
            status: 'fail',
            message: "Wrong password"
        })
    }

    next()
}

const authJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // "Bearer TOKEN"
    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.userName = decoded.userName;
        req.userId = decoded.userId;
        next()
    })
    
}

module.exports = {validation, authentication, authJWT};