const {getWinner} = require('../../services/rankingUtils')

module.exports = async (req, res) => {
    try {
        let winner = await getWinner();

        if (!winner) winner = {};

        res.status(200).send({
            status: "success",
            winner
        });
        

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
