require('dotenv').config()
const bcrypt = require('bcrypt')
const Rooms = require('mongoose').model("Rooms")
const {newRoom} = require('../sockets/sockets');

module.exports = async (req, res) => {
    try {
        const room = await Rooms.find({name: req.body.name});

        if(room.length) return res.status(400).send({ status: "fail", message: `room already created`});

        await Rooms.create({ name: req.body.name })

        newRoom(req.body.name);

        res.status(201).send({
            status: "success", 
            message: `room ${req.body.name} created`
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
