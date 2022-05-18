require('dotenv').config()
const bcrypt = require('bcrypt')
const Rooms = require('mongoose').model("Rooms")
const {socketsCreateRoom} = require('../sockets/sockets');

module.exports = async (req, res) => {
    try {
        const rooms = await Rooms.find({name: req.body.name});

        if(rooms.length) return res.status(400).send({ status: "fail", message: `room already created`});

        const room = await Rooms.create({ name: req.body.name })
        
        const newRoom = {_id: room._id, name: room.name, cmd: "add"};

        socketsCreateRoom(newRoom);

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
