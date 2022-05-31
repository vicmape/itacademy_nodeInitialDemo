const {getGames} = require('../../services/gamesUtils')

module.exports = async function (req, res) {
    try {

       let games = await getGames(req, res);

       if (!games) return res.status(400).send({ status: "fail", message: "user not found"}); // 400 - Bad request

        res.status(200).send({
            status: "success",
            games
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};