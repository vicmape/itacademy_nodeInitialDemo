const {getRanking} = require('../../services/rankingUtils');

module.exports = async (req, res) => {
    try {
        let ranking = await getRanking();

        res.status(200).send({
            status: "success",
            ranking
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
