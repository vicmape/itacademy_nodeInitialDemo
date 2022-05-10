
const Players = require('../models/dices');

module.exports = async function getPlayers(req, res) {

    // Query all players
    Players.findAll()
        .then(players => {
            //Get id and usernames
            let playerData = players.map(i => {
                return {id: i.dataValues.id, username:i.dataValues.username}
            });

              res.status(200).send({
                  status: "success",
                  data:  {
                      players: playerData
                  }
              });

        })
        .catch(err => console.log(err))
}