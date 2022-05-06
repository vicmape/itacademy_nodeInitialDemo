const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.send( {
            status: "success",
            data: {
                nom: "Victor",
                edat: "34",
                url: req.protocol + "://" + req.get('Host') + req.originalUrl
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
