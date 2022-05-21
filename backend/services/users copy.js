require('dotenv').config()
const Rooms = require('mongoose').model("Rooms")

async function getUsers(room) {

    let result;

    try {

        const {usersConnected} = await Rooms.findOne({_id: room.roomId});
        result = {status: 'success', usersConnected};

    } catch (err) {
        result =  {status:'fail', message: err.message};
    }

    return result;
}

module.exports = {getUsers}