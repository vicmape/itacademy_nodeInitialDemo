require('dotenv').config()
const Rooms = require('mongoose').model("Rooms")
const {socketEmit} = require('../sockets/sockets');

module.exports = async (req, res) => {
    try {

        const rooms = await Rooms.find({roomName: req.body.roomName});
        
        if(rooms.length) return res.status(400).send({ status: "fail", message: `room already created`});
        
        const room = await Rooms.create({ roomName: req.body.roomName })

        const newRoom = {roomId: room._id, roomName: room.roomName, cmd: "add"};

        socketEmit('rooms', newRoom);

        res.status(201).send({
            status: "success", 
            message: `room created`
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
