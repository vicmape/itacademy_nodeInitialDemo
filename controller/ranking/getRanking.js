const {Players, Rolls} = require ('../../models/dices');
const Sequelize = require('sequelize');

module.exports = async (req, res) => {
    try {
        let players = await Players.findAll({
            include: [{
                model: Rolls,
                required: false
               }],
            attributes: ['id','username',[Sequelize.fn('AVG', Sequelize.col('win')), 'win', ]],
            group: 'id'
        });

        console.log(players)

        // Filter for players that have rolls. i.e. win !== null
        players = players.filter(p => p.dataValues.win).sort(function(a,b) {
            return b.dataValues.win - a.dataValues.win;
        });

        // Check if there is a ranking
        if (players.length === 0) {
            res.status(404).send({
                status: "fail",
                data:  {
                    message: "There is no ranking yet"
                }
            });

        } else {
            let rank = 1;

            players = players.map(i => {
                return {
                    playerId: i.dataValues.id,
                    username: i.dataValues.username,
                    percentage: i.dataValues.win,
                    rankingPosition: rank++
                }
            });
                
                res.status(200).send({
                    status: "success",
                    data:  {
                        players
                    }
                });
        }
    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
