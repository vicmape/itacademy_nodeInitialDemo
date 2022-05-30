require('dotenv').config()
const bcrypt = require('bcrypt')
const Users = require('mongoose').model("Users")

module.exports = async (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;

        if (!userName) return res.status(400).send({ status: "fail", message: `Username not provided`});
        if (!password) return res.status(400).send({ status: "fail", message: `Password not provided`});

        if (/\s/.test(userName)) return res.status(400).send({ status: "fail", message: `User name cannot have spaces`});

        const exist = await Users.find({userName});
        if(exist.length > 0) return res.status(400).send({ status: "fail", message: `Username already registered`});

        const hashedPassword = await bcrypt.hash(password, 10)

        await Users.create({ userName: userName, password: hashedPassword })

        res.status(201).send({
            status: "success", 
            message: `user ${userName} registered`
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
