const fetch = require('cross-fetch');
const express = require("express");
const router = express.Router();

router.get('/:id', (req, res) => {

        // Check if req.params.id is a natural number
        let isnum = /^\d+$/.test(req.params.id);

        if (!isnum) return res.status(400).send({ status: "fail", message: "Pokemon id must be a natural number"});

        fetch('https://pokeapi.co/api/v2/pokemon/'+req.params.id)
        .then(res => {
        if (res.status >= 400) {
            throw new Error(res.status);
        }
        return res.json();
        })
        .then(data => {
            res.send({
                status: "success",
                data: {
                    name: data.name,
                    height: data.height,
                    weight: data.weight
                }
            });
        }).catch(err => {

            let num = parseInt(err.message);

            if (num === 400) res.status(num).send({ status: "fail", message: "Bad request"});
            else if (num === 404) res.status(num).send({ status: "fail", message: `Pokemon with id ${req.params.id} not found`});
            else res.status(500).send({ status: "error", message: err.message });
        })
});

module.exports = router;
