require('dotenv').config()

const Rooms = require('mongoose').model("Rooms")

module.exports = async (req, res) => {
    try {

        let room = await Rooms.findOne({ _id: req.params.id });

        if (room.length === 0) return res.status(400).send({ status: "fail", message: `This room does not exists`});

        // Delete this user from all rooms
        await Rooms.updateMany(
            { },
            { $pull: { usersConnected: req.userName }} 
        );

        // Push this user into the current room
        await Rooms.updateOne(
            { _id: req.params.id }, 
            { $push: { usersConnected: req.userName }}
        );

        res.status(201).send({
            status: "success", 
            room
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
