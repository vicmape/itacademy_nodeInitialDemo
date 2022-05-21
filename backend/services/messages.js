require('dotenv').config()
const Rooms = require('mongoose').model("Rooms")

async function getMessages(room) {

    let result;

    try {

        let {messages} = await Rooms.findOne({_id: room.roomId});
        console.log('inside get-messages 1', messages)
        messages = messages.map(({ user, room, text}) => ({ user, room, text }));
        console.log('inside get-messages 2', messages)

        result = {status: 'success', messages};

    } catch (err) {
        result =  {status:'error', message: err.message};
    }

    return result;
}

async function storeMessage(message) {

    let result;

    try {
        console.log('inside storeMessage', message)
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

module.exports = {getMessages, storeMessage}