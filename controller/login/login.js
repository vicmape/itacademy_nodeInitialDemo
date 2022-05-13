require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {

    try {

        res.status(200).send("Success");

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}