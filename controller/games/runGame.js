const { runGame } = require('../../services/gamesUtils');

module.exports = async function (req, res) {
    try {
        const game = await runGame(req, res);

        if (!game) return res.status(400).send({ status: "fail", message: "user not found"}); // 400 - Bad request

        res.status(200).send({
            status: "success",
            game
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};