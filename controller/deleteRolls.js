const {Players, Rolls} = require('../models/dices');

module.exports = async function (req, res) {
    try {
        // Check if user exists
        const user = await Players.findOne({
            where: { username: req.params.id },
            });
        if(!user) return res.status(400).send({ status: "fail", message: "user not found"}); // 400 - Bad request

        let dat = await Rolls.destroy({
            where: { playerId: user.id },
          });

        res.status(200).send({
            status: "success",
            data: {
                username: user.username,
                message: "Rolls deleted"
            }
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};