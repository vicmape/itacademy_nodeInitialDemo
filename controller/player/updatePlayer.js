const {Players} = require ('../../models/dices');

module.exports = async (req, res)  => {
    try {

        // Find the user
        const player = await Players.findOne({where: { id: parseInt(req.params.id) }});

        // Check if player ID does exist
        if (!player) return res.status(400).send({ status: "fail", message: "player id not found"}); // 400 - Bad request
        

        // Check if username is provided
        if (!req.body.username) return res.status(400).send({ status: "fail", message: "username not provided"}); // 400 - Bad request

        // Check if username is different from previous one
        if (player.dataValues.username === req.body.username) return res.status(400).send({ status: "fail", message: "new username must be different"}); // 400 - Bad request

        // Check if username is already registered
        const alreadyRegistered = await Players.findOne({
            where: { username: req.body.username },
        });

        if (alreadyRegistered) {
            return res.status(400).send({ status: "fail", message: "username already registered"}); // 400 - Bad request
        }

        // Update record
        await Players.update(
            { username: req.body.username.toLowerCase()},
            { where: { username: player.dataValues.username } }
        );

        res.status(200).send({
            status: "success",
            data: {
                username: req.body.username.toLowerCase()
            }
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};
