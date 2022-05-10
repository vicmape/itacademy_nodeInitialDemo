
const {Players} = require ('../models/dices');

module.exports = async function addPlayers(req, res) {

    try {

        if (!req.body.username) {
            return res.status(400).send({ status: "fail", message: "username property not found"}); // 400 - Bad request
        }

        const alreadyRegistered = await Players.findOne({
            where: { username: req.body.username },
          });

        if(alreadyRegistered){
            return res.status(400).send({ status: "fail", message: "username already registered"}); // 400 - Bad request
        }

        let player = await Players.create({ username: req.body.username })

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