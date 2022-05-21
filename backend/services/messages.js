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

module.exports = {getMessages}