const {getLoser} = require('../../services/rankingUtils')

module.exports = async (req, res) => {
    try {
        let loser = await getLoser();

        res.status(200).send({
            status: "success",
            loser
        });
        

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
