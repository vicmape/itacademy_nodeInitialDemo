const checkBasicAuth = require('../middlewares/checkBasicAuth');
const cors = require('../middlewares/cors');
const noCache = require('../middlewares/noCache');

const express = require("express");
const router = express.Router();

router.post('/', cors, noCache, checkBasicAuth, (req, res) => {
    try {
        res.send({
            status: "success",
            data: {
                username: req.body.username,
                date: new Date()
            }
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router;
