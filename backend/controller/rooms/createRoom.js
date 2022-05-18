require('dotenv').config()
const bcrypt = require('bcrypt')
const Rooms = require('mongoose').model("Rooms")
const {socketsCreateRoom} = require('../sockets/sockets');

module.exports = async (req, res) => {
    try {

        const rooms = await Rooms.find({roomName: req.body.roomName});
        
        if(rooms.length) return res.status(400).send({ status: "fail", message: `room already created`});
        
        const room = await Rooms.create({ roomName: req.body.roomName })

        const newRoom = {roomId: room._id, name: room.roomName, cmd: "add"};

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
