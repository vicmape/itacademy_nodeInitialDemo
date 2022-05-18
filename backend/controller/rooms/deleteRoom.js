require('dotenv').config()
const {socketEmit} = require('../sockets/sockets')
const Rooms = require('mongoose').model("Rooms")

module.exports = async (req, res) => {
    try {

        const room = await Rooms.deleteOne({ _id: req.params.id });
        
        if (room.deletedCount === 0) return res.status(400).send({ status: "fail", message: `room already deleted`});
        
        console.log("DELETED ", room)

        const deleteRoom = {roomId: req.params.id, cmd: "delete"};

        socketEmit('rooms', deleteRoom)

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
