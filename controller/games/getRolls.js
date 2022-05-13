const {getRolls} = require('../../services/gamesUtils')

module.exports = async function (req, res) {
    try {

       let rolls = await getRolls(req, res);

       if (!rolls) return res.status(400).send({ status: "fail", message: "user not found"}); // 400 - Bad request

        res.status(200).send({
            status: "success",
            rolls
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};