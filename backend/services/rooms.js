require('dotenv').config()
const Rooms = require('mongoose').model("Rooms")
const Users = require('mongoose').model("Users")

async function createRoom(roomName) {

    let result;

    try {
        // Check if room is already created
        const roomExist = await Rooms.findOne({ roomName });

        if(roomExist) {
            result =  {status:'fail', message:'room already created'};
        } else {
            const room = await Rooms.create({ roomName })
            result = {status: 'success', room: {roomId: room._id, roomName: room.roomName}}
        }
    } catch (err) {
        result =  {status:'error', message: err.message};
    }

    return result;
}

async function getRooms() {

    let result;

    try {

        let rooms = await Rooms.find({});

        rooms = rooms.map(({_id, roomName})=> { 
            return {roomId:_id, roomName};
          });

        result = {status: 'success', rooms};

    } catch (err) {
        result =  {status:'error', message: err.message};
    }

    return result;
}

module.exports = {createRoom, getRooms}