
const Players = require('../models/dices');

module.exports = async function addPlayers(req, res) {

    if (!req.body || !req.body.username) {
        return res.status(400).send({ status: "fail", message: "username not found"}); // 400 - Bad request
    }

    try {

        Players.create({
            username: req.body.username
        })
        .then(player => {
            console.log("new player")
            console.log(player)
            res.send({
                status: "success",
                data: {
                    username: req.body.username,
                }
            });
            res.redirect('/players')
        })
        .catch(err => console.log(err))

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}