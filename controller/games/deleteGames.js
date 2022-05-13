const {deleteGames} = require('../../services/gamesUtils')

module.exports = async function (req, res) {
    try {
        // Check if user exists
        let result = await deleteGames(req,res);

        // I know this is not the best way of doing this but I dont want to build a cool loggin system right now...
        if (result === 1) return res.status(400).send({ status: "fail", message: "user not found"}); // 400 - Bad request

        res.status(200).send({
            status: "success",
            data: {
                playerId: parseInt(req.params.id),
                message: "Games deleted"
            }
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};