require('dotenv').config()
const Users = require('mongoose').model("Users")

async function getUsers(room) {

    let result;

    try {

        let users = await Users.find({roomId: room.roomId});
        users = users.map(({ _id, userName}) => ({ userId: _id, userName }));
        result = {status: 'success', users};

    } catch (err) {
        result =  {status:'fail', message: err.message};
    }

    return result;
}

async function userSocket (userId, socketId) {

    let result;
    try {

        // Push this user into the current room
        const update = await Users.updateOne(
            { _id: userId }, 
            { socketId: socketId }
            );
            
        if (update.acknowledged === true &&
            update.modifiedCount === 1 &&
            update.upsertedId === null &&
            update.upsertedCount === 0 &&
            update.matchedCount === 1 ) {

            result = {status: 'success'};
        } else {
            result = {status: 'fail', message: update}
        }
    } catch (err) {
        result =  {status:'fail', message: err.message};
    }

        return result;
}


async function disconnectUser (socketId) {
    let result;

    try {
        const userUpdate = await Users.findOneAndUpdate(
            { socketId: socketId }, 
            { roomId: null, socketId: null }
            );

        console.log('disconnectUser', userUpdate)
        if (userUpdate) {
            result = {status: 'success', 
                      user: {userId: userUpdate._id, userName: userUpdate.userName},
                      roomId: userUpdate.roomId}
        } else {
            result = {status: 'fail', message: 'user not found'}
        }
    } catch (err) {
        result =  {status:'fail', message: err.message};
    }

        return result;
}


async function joinRoom (userId, room) {

    let result;
    try {
        console.log("joinRoom server")
        // Push this user into the current room
        const updateUser = await Users.findOneAndUpdate(
            { _id: userId }, 
            { roomId: room.roomId }
            );
            console.log(updateUser)

        if (updateUser) {
            result = {status: 'success',
                      user: { userId: updateUser._id, userName: updateUser.userName},
                      roomId: updateUser.roomId};
        } else {
            result = {status: 'fail', message: 'Error joining room'}
        }
    } catch (err) {
        result =  {status:'fail', message: err.message};
    }

        return result;
}

module.exports = {getUsers, userSocket, disconnectUser, joinRoom}