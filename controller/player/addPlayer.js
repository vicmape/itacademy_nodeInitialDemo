
const {Players} = require ('../../models/dices');
const Sequelize = require('sequelize')

module.exports = async (req, res) => {

    try {

        let player = '';

        if (req.body.username) {

            const alreadyRegistered = await Players.findOne({
                where: { username: req.body.username },
            });

            if(alreadyRegistered){
                return res.status(400).send({ status: "fail", message: "username already registered"}); // 400 - Bad request
            }

            player = await Players.create({ username: req.body.username.toLowerCase() })

        } else {
            player = await Players.create({ username: 'ANONIM' })
        }
            
            res.status(200).send({
                status: "success",
                data: {
                    id: player.id,
                    username: player.username,
                }
            });
            
     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}