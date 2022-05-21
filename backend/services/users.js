require('dotenv').config()
const Users = require('mongoose').model("Users")

async function getUsers(room) {

    let result;

    try {

        let users = await Users.find({roomId: room.roomId});
        users = users.map(({ _id, userName}) => ({ userId: _id, userName }));
        result = {status: 'success', users};

    } catch (err) {
        result =  {status:'error', message: err.message};
    }

    return result;
}

async function userSocket (userId, socketId) {

    let result;
    try {
        Users.findOneAndUpdate
        // Push this user into the current room
        const oldUser = await Users.findOneAndUpdate(
            { _id: userId }, 
            { socketId: socketId, roomId: '' }
            );

        const user = await Users.findOneAndUpdate(
            { _id: userId }, 
            { oldSocketId: oldUser.socketId,  roomId: ''}
            );
            
        if (user) {
            result = {status: 'success'};
        } else {
            result = {status: 'fail', message: update}
        }
    } catch (err) {
        result =  {status:'error', message: err.message};
    }

        return result;
}


async function disconnectUser (socketId) {
    let result;

    try {
        console.log('socketid', socketId)
        const userUpdate = await Users.findOneAndUpdate(
            { socketId: socketId }, 
            { roomId: null }
            );
        console.log('userUpdate', userUpdate)
        const userUpdate2 = await Users.findOneAndUpdate(
            { oldSocketId: socketId }, 
            { roomId: null }
            );
            console.log('userUpdate2', userUpdate2)

        if (userUpdate) {
            result = {status: 'success', 
                      user: {userId: userUpdate._id, userName: userUpdate.userName},
                      roomId: userUpdate.roomId}
        } else if (userUpdate2) {
            result = {status: 'success', 
                      user: {userId: userUpdate2._id, userName: userUpdate2.userName},
                      roomId: userUpdate2.roomId}
        } else {
            result = {status: 'fail', message: 'socketid for user disconnect not found'}
        }
    } catch (err) {
        result =  {status:'error', message: err.message};
    }

        return result;
}


async function joinRoom (userId, room) {

    let result;
    try {
        // Push this user into the current room
        const updateUser = await Users.findOneAndUpdate(
            { _id: userId }, 
            { roomId: room.roomId }
            );

        if (updateUser) {
            result = {status: 'success',
                      user: { userId: updateUser._id, userName: updateUser.userName},
                      roomId: updateUser.roomId};
        } else {
            result = {status: 'fail', message: 'Error joining room'}
        }
    } catch (err) {
        result =  {status:'error', message: err.message};
    }

        return result;
}

module.exports = {getUsers, userSocket, disconnectUser, joinRoom}