require('dotenv').config()

const{socketEmit} = require('../../controller/sockets/sockets')

const Rooms = require('mongoose').model("Rooms")

module.exports = async (req, res) => {
    try {
        let room = await Rooms.findOne({ _id: req.params.id });

        if (room.length === 0) return res.status(400).send({ status: "fail", message: `This room does not exists`});

        // Get the user old room
        const userOldRoom = await Rooms.findOne({ "usersConnected.userId": req.userId });

        // Delete this user from other rooms
        await Rooms.updateMany(
            { },
            { $pull: { usersConnected: {userId: req.userId }}} 
            );

        // Push this user into the current room
        await Rooms.updateOne(
            { _id: req.params.id }, 
            { $push: { usersConnected: {userName: req.userName, userId: req.userId} }}
        );

        // Get the user new room
        const userNewRoom = await Rooms.findOne({ "usersConnected.userId": req.userId });

        // Delete use from older room
        if (userOldRoom) {
            const socketOldRoom = `room_${userOldRoom._id}_users`;
            const userToDelete = {userName: req.userName, userId: req.userId, cmd: "delete"};
            socketEmit(socketOldRoom, userToDelete);
        }

        const socketNewRoom = `room_${userNewRoom._id}_users`;
        const userToAdd = {userName: req.userName, userId: req.userId, cmd: "add"};

        socketEmit(socketNewRoom, userToAdd);

        res.status(201).send({
            status: "success", 
            message: "room selected"
        });

     } catch (err) {
         console.log("ERROR", err.message)
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
