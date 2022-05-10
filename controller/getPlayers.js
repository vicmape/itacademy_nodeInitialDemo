const {Players} = require ('../models/dices');

module.exports = async function getPlayers(req, res) {
    try {
        let players = await Players.findAll();

        let playersData = players.map(i => {
            return {id: i.dataValues.id, username:i.dataValues.username}
        });

        res.status(200).send({
            status: "success",
            data:  {
                players: playersData
            }
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}