const {Players, Rolls} = require ('../models/dices');
const Sequelize = require('sequelize');

module.exports = async function getPlayers(req, res) {
    try {
        let players = await Players.findAll({
            include: [{
                model: Rolls,
                required: false
               }],
            attributes: ['id',[Sequelize.fn('AVG', Sequelize.col('win')), 'win']],
            group: 'id'
        });

        players.sort(function(a,b){
            return b.dataValues.win - a.dataValues.win;
        });

        let rank = 1;

        let playersData = players.map(i => {
            return {
                playerId: i.dataValues.id,
                percentage: (i.dataValues.win) ? i.dataValues.win:0,
                rankingPosition: rank++}
        });

        res.status(200).send({
            status: "success",
            data:  {
                players: playersData
            }
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
