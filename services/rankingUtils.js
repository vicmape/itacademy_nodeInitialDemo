const {Players, Rolls} = require ('../models/dices');
const Sequelize = require('sequelize');

async function getRanking() {
    let players = await Players.findAll({
        include: [{
            model: Rolls,
            required: false
           }],
        attributes: ['id','username',[Sequelize.fn('AVG', Sequelize.col('win')), 'win', ]],
        group: 'id'
    });

    let rank = 1;

    // Filter for players that have rolls. i.e. win !== null
    // and sort by its winrate
    let ranking = 
        players
        .filter(p => p.dataValues.win)
        .sort((a,b) => b.dataValues.win - a.dataValues.win)
        .map(i => {
            return {
                playerId: i.dataValues.id,
                username: i.dataValues.username,
                percentage: i.dataValues.win,
                rankingPosition: rank++
            }
        });

    return ranking;
}

async function getLoser() {
    let ranking = await getRanking();
    console.log(ranking)
    console.log(ranking[ranking.length - 1])
    
    return ranking[ranking.length - 1];
}

async function getWinner() {
    let ranking = await getRanking();
    return ranking[0];
}

module.exports = {getRanking, getLoser, getWinner}