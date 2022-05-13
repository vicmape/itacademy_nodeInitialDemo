const { rollDices } = require('../../services/gamesUtils');

module.exports = async function (req, res) {
    try {
        const roll = await rollDices(req, res);

        if (!roll) return res.status(400).send({ status: "fail", message: "user not found"}); // 400 - Bad request

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