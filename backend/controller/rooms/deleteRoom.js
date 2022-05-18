require('dotenv').config()
const {socketsDeleteRoom} = require('../sockets/sockets')
const Rooms = require('mongoose').model("Rooms")

module.exports = async (req, res) => {
    try {
        console.log("DELETING ", room)
        const room = await Rooms.deleteOne({ _id: req.params.id });
        console.log("DELETED ", room)

        if (room.deletedCount === 0) return res.status(400).send({ status: "fail", message: `room already deleted`});


        const deleteRoom = {roomId: "", cmd: "delete"};

        socketsDeleteRoom(deleteRoom)

        res.status(201).send({
            status: "success", 
            message: `room deleted`
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
