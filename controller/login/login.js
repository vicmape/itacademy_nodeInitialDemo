require('dotenv').config()

const jwt = require('jsonwebtoken')
const {Admins} = require('../../models/dices')

//require('crypto').randomBytes(64).toString('hex')

module.exports = async (req, res) => {

    try {
        const user = {
            username: req.body.username
        }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        res.json(accessToken);

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}