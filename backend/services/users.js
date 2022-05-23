require('dotenv').config()
const Users = require('mongoose').model("Users")

async function getUsers(room) {
    let result;
    try {
        let users = await Users.find({'room.roomId': room.roomId});
        // console.log('getUsers', users)
        users = users.map(({ _id, userName }) => ({ userId: _id, userName }));
        result = {status: 'success', users};

    } catch (err) {
        result =  {status:'error', message: err.message};
    }

    return result;
}

async function userSocket (userId, socketId) {

    let result;
    try {

        const userUpdateSocket = await Users.findOneAndUpdate({ _id: userId }, { socketId });
        // console.log('userUpdateSocket', userUpdateSocket)
        const userUpdateOldSocket = await Users.findOneAndUpdate({ _id: userId }, { oldSocketId: userUpdateSocket.socketId });
        // console.log('userUpdateOldSocket', userUpdateOldSocket)

        if (userUpdateOldSocket) {
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
        const userUpdate = await Users.findOneAndUpdate(
            { socketId: socketId }, 
            { 'room.roomId': null, 'room.roomName': null}
            );

        const userUpdate2 = await Users.findOneAndUpdate(
            { oldSocketId: socketId }, 
            { 'room.roomId': null, 'room.roomName': null}
            );

        if (userUpdate) {
            result = {status: 'success', 
                      user: {userId: userUpdate._id, userName: userUpdate.userName},
                      room: userUpdate.room}
        } else if (userUpdate2) {
            result = {status: 'success', 
                      user: {userId: userUpdate2._id, userName: userUpdate2.userName},
                      room: userUpdate2.room}
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
        //console.log('joinRoom', room);

        // Push this user into the current room
        const updateUser = await Users.findOneAndUpdate(
            { _id: userId }, 
            { 'room.roomId': room.roomId, 'room.roomName': room.roomName }
            );

        //console.log("updateUser", updateUser)

        if (updateUser) {
            result = {status: 'success',
                      user: { userId: updateUser._id, userName: updateUser.userName },
                      room: updateUser.room
                     };
        } else {
            result = {status: 'fail', message: 'Error joining room'}
        }
    } catch (err) {
        result =  {status:'error', message: err.message};
    }

        return result;
}

module.exports = {getUsers, userSocket, disconnectUser, joinRoom}