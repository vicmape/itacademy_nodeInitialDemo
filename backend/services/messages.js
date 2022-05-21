require('dotenv').config()
const Rooms = require('mongoose').model("Rooms")

async function getMessages(room) {

    let result;

    try {

        const {messages} = await Rooms.findOne({_id: room.roomId});

        result = {status: 'success', messages};

    } catch (err) {
        result =  {status:'error', message: err.message};
    }

    return result;
}

async function storeMessage(user, room, message) {

    let result;

    try {

        // Push this user into the current room
        result = await Rooms.updateOne(
            { _id: room.roomId }, 
            { $push: { messages: {userName: user.userName, userId: user.userId, message} }}
        );
            console.log(result)
            result = {status: 'success'};

    } catch (err) {
        result =  {status:'error', message: err.message};
    }

    return result;
}

module.exports = {getMessages, storeMessage}