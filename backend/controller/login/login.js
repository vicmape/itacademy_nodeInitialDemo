require('dotenv').config()
const Users = require('mongoose').model("Users")
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {

    try {
        const userEntry = await Users.findOne({userName: req.body.userName});

        const user = {
            userId: userEntry._id,
            userName: userEntry.userName
        }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        res.status(201).send({
            status: "success", 
            userName: user.userName,
            userId: user.userId,
            accessToken
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
