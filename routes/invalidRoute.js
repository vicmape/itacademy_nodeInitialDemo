const express = require("express");
const router = express.Router();

router.get("*", (req, res) => {
    res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"});
});

module.exports = router;
