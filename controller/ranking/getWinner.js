const {Players, Rolls} = require ('../../models/dices');
const Sequelize = require('sequelize');

module.exports = async (req, res) => {
    try {
        let players = await Players.findAll({
            include: [{
                model: Rolls,
                required: false
               }],
            attributes: ['id', 'username',[Sequelize.fn('AVG', Sequelize.col('win')), 'win']],
            group: 'id'
        });

        players.sort(function(a,b){
            return b.dataValues.win - a.dataValues.win;
        });

        let rank = 1;

        let player =
            players
                .filter(p => p.dataValues.win)
                .map(i => {
                    return {
                        playerId: i.dataValues.id,
                        username: i.dataValues.username,
                        percentage: i.dataValues.win,
                        rankingPosition: rank++
                    }
                });

        // Check if there is no rolls yet
        if (Object.keys(player).length === 0) {
            res.status(404).send({
                status: "fail",
                data:  {
                    message: "There is no ranking yet"
                }
            });
        } else {

            player = player[0];
            
            res.status(200).send({
                status: "success",
                player
            });
        }

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
