const {Players} = require ('../models/dices');

module.exports = async function updatePlayer(req, res) {
    try {
        // Check if username is provided
        if (!req.body.username) return res.status(400).send({ status: "fail", message: "username property not found"}); // 400 - Bad request
        // Check if new username is provided
        if (!req.body.newUsername) return res.status(400).send({ status: "fail", message: "newUsername property not found"}); // 400 - Bad request
        // Check if username and new username are different
        if (req.body.username === req.body.newUsername) return res.status(400).send({ status: "fail", message: "newUsername must be different"}); // 400 - Bad request


        // Check if username is already registered
        const usernameRegistered = await Players.findOne({
            where: { username: req.body.username },
          });
        if(!usernameRegistered) return res.status(400).send({ status: "fail", message: "username not found"}); // 400 - Bad request

        // Check if new username is already registered
        const newUsernameRegistered = await Players.findOne({
            where: { username: req.body.newUsername },
          });
        if(newUsernameRegistered) return res.status(400).send({ status: "fail", message: "newUsername already registered"}); // 400 - Bad request

        // Update record
        await Players.update(
            { username: req.body.newUsername},
            { where: { username: req.body.username } }
        );

        res.status(200).send({
            status: "success",
            data: {
                username: req.body.newUsername
            }
        });

    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
};
