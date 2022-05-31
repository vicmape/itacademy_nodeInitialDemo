const {Players} = require('../../models/dices');

module.exports = async (req, res) => {
    try {

        // Find the user
        const player = await Players.findOne({where: { id: parseInt(req.params.id) }});

        // Check if player ID does exist
        if (!player) return res.status(400).send({ status: "fail", message: "player id not found"}); // 400 - Bad request

        //Delete the user
        let dat = await Players.destroy({where: { id: parseInt(req.params.id) }});

        console.log(dat)

        res.status(200).send({
            status: "success",
            data: {
                id: player.dataValues.id,
                username: player.dataValues.username,
                message: "User deleted"
            }
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};