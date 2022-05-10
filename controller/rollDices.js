const {Players, Rolls} = require ('../models/dices');

module.exports = async function (req, res) {
    try {
        // Check if user exists
        const user = await Players.findOne({
            where: { username: req.params.id },
            });
        if(!user) return res.status(400).send({ status: "fail", message: "user not found"}); // 400 - Bad request

        const roll = {
            playerId: user.id,
            dice1: Math.floor(Math.random()*(6-1+1)+1),
            dice2: Math.floor(Math.random()*(6-1+1)+1) //Math.floor(Math.random()*(max-min+1)+min)
        };

        await Rolls.create(roll)

        res.status(200).send({
            status: "success",
            data: {
                roll
            }
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};