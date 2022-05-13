const {Players, Rolls} = require('../../models/dices');

module.exports = async function (req, res) {
    try {

        // Check if user exists
        const user = await Players.findOne({
            where: { id: parseInt(req.params.id) },
            });
        if(!user) return res.status(400).send({ status: "fail", message: "user id not found"}); // 400 - Bad request

        // Get all the rolls of this player
        let rolls = await Rolls.findAll({
            where: { playerId: user.id },
          });

        res.status(200).send({
            status: "success",
            data: {
                username: user.username,
                rolls
            }
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};