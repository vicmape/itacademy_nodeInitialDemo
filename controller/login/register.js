const bcrypt = require('bcrypt')
const {Admins} = require ('../../models/dices');

module.exports = async (req, res) => {

    try {
        const user = await Admins.findOne({
            where: { username: req.body.username.toLowerCase() },
        });
    
        if(user !== null) return res.status(400).send({ status: "fail", message: `user ${req.body.username.toLowerCase()} already registered as admin`});

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        player = await Admins.create({ username: req.body.username.toLowerCase(), password: hashedPassword })
        res.status(201).send({
            status: "success", 
                message: `user ${req.body.username.toLowerCase()} registered as admin` });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
