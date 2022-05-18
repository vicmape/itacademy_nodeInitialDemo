require('dotenv').config()
const {socketsDeleteRoom} = require('../sockets/sockets')
const Rooms = require('mongoose').model("Rooms")

module.exports = async (req, res) => {
    try {
        const room = await Rooms.deleteOne({ _id: req.body._id });

        if (room.deletedCount === 0) return res.status(400).send({ status: "fail", message: `room already deleted`});

        const deleteRoom = {_id: req.body._id, cmd: "delete"};

        socketsDeleteRoom(deleteRoom)

        res.status(201).send({
            status: "success", 
            message: `user ${req.body.username} registered`
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
