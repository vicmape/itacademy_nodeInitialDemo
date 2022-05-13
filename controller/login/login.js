require('dotenv').config()

module.exports = async function login(req, res) {

    try {

        if (!req.body.username) {
            return res.status(400).send({ status: "fail", message: "username property not found"}); // 400 - Bad request
        }

        const username = req.body.username;
        const user = { name: username };

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.status(200).send({
            status: "success",
            data: {
                id: player.id,
                username: player.username,
            }
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}