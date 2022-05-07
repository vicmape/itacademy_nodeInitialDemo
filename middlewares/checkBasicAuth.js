
module.exports = function (req, res, next) {
    if (!req.body.username) return res.status(400).send({ status: "fail", message: "'username' not found"});
    if (!req.body.password) return res.status(400).send({ status: "fail", message: "'password' not found"});

    if (req.body.username !== "victor") return res.status(401).send({ status: "fail", message: "wrong user"});
    if (req.body.password !== "1234") return res.status(401).send({ status: "fail", message: "wrong password"});

    next();
}