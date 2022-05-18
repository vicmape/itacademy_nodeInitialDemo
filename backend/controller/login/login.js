require('dotenv').config()
const Users = require('mongoose').model("Users")
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {

    try {
        const userId = await Users.findOne({username: req.body.username});

        const user = {
            userId: userId._id,
            userName: req.body.username
        }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        res.status(201).send({
            status: "success", 
            accessToken
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
