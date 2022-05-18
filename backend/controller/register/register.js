require('dotenv').config()
const bcrypt = require('bcrypt')
const Users = require('mongoose').model("Users")

module.exports = async (req, res) => {
    try {
        const user = await Users.find({userName: req.body.userName});
    
        if(user.length) return res.status(400).send({ status: "fail", message: `user already registered`});

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        await Users.create({ userName: req.body.userName, password: hashedPassword })

        res.status(201).send({
            status: "success", 
            message: `user ${req.body.userName} registered`
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
