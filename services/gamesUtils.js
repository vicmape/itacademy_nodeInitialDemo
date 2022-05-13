const database = require('../config/database');
const {Players, Rolls} = require ('../models/dices');

async function rollDices (req, res) {

    // Check if user exists
    const user = await Players.findOne({
        where: { id: parseInt(req.params.id) },
        });

    // If user does not exist exit here
    if(!user) return;

    // Roll dices
    //Math.floor(Math.random()*(max-min+1)+min) for number between [1,6]
    let dice1 = Math.floor(Math.random()*(6-1+1)+1);
    let dice2 = Math.floor(Math.random()*(6-1+1)+1);

    const roll = {
        playerId: user.id,
        dice1,
        dice2, 
        win: ((dice1+dice2) === 7 ? 1 : 0)
    };

    await Rolls.create(roll);

    return roll;
};

async function getRolls(req, res) {
    console.log(1)
    // Check if user exists
    const user = await Players.findOne({
    where: { id: parseInt(req.params.id) },
    });

    // If user does not exist exit here
    if(!user) return

    // Get all the rolls of this player
    let rolls = await Rolls.findAll({
        where: { playerId: user.id },
      });

    return rolls;
}

async function deleteRolls(req, res) {
    const user = await Players.findOne({
        where: { id: parseInt(req.params.id) },
        });
    if(!user) return 1; //user not found

    let result = await Rolls.destroy({
        where: { playerId: user.id },
        });

    return result;
}
module.exports = {rollDices, getRolls, deleteRolls}