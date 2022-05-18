require('dotenv').config()

const{socketEmit} = require('../../controller/sockets/sockets')

const Rooms = require('mongoose').model("Rooms")

module.exports = async (req, res) => {
    try {

        let room = await Rooms.findOne({ _id: req.params.id });

        if (room.length === 0) return res.status(400).send({ status: "fail", message: `This room does not exists`});

        // Get the user old room
        const userOldRoom = await Rooms.findOne({ usersConnected: req.userName });
        
        // Delete this user from other rooms
        await Rooms.updateMany(
            { },
            { $pull: { usersConnected: req.userName }} 
        );
            
        // Push this user into the current room
        await Rooms.updateOne(
            { _id: req.params.id }, 
            { $push: { usersConnected: req.userName }}
        );

        // Get the user new room
        const userNewRoom = await Rooms.findOne({ usersConnected: req.userName });

        console.log("USER OLD ROOM", userOldRoom.name, userOldRoom._id)
        console.log("USER NEW ROOM", userNewRoom.name, userNewRoom._id)

        const socketOldRoom = `room_${userOldRoom._id}_users`;
        const socketNewRoom = `room_${userNewRoom._id}_users`;

        const userToAdd = {roomId: userNewRoom._id, userName: req.userName, cmd: "add"};
        const userToDelete = {roomId: userOldRoom._id, userName: req.userName, cmd: "delete"};

        console.log(socketOldRoom)
        console.log(userToDelete)

        console.log(socketNewRoom)
        console.log(userToAdd)

        socketEmit(socketNewRoom, userToAdd);
        socketEmit(socketOldRoom, userToDelete);

        res.status(201).send({
            status: "success", 
            room
        });

     } catch (err) {
         console.log("ERROR", err.message)
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
