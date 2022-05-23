require('dotenv').config()
const Rooms = require('mongoose').model("Rooms")

async function getMessages(room) {

    let result;

    try {

        let roomInfo = '';
        let messages = '';

        if (room.roomId) {
            roomInfo = await Rooms.findOne({_id: room.roomId});
        } else if (room.roomName) {
            roomInfo = await Rooms.findOne({roomName: room.roomName});
        }else {
            throw new Error('roomId nor roomName provided');
        }

        if (roomInfo.messages !== null) {
            messages = roomInfo.messages.map(({ user, room, text}) => ({ user, room, text }));
        }

        result = {status: 'success', messages};

    } catch (err) {
        result =  {status:'error', message: err.message};
    }

    return result;
}

async function newMessage(message) {

    let result;

    try {
        // Push this user into the current room
        result = await Rooms.updateOne(
            { _id: message.room.roomId }, 
            { $push: { messages: message }}
        );

        result = {status: 'success', message};

        return result;

    } catch (err) {
        result =  {status:'error', message: err.message};
    }

    return result;
}

module.exports = {getMessages, newMessage}