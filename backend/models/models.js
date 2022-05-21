require('dotenv').config()

const mongoose = require('mongoose');

module.exports = () => {
    let mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    
    const usersSchema = new mongoose.Schema({
        userName: String,
        password: String,
        roomId: String,
        oldSocketId: String,
        socketId: String
    }, { timestamps: true });

    const roomsSchema = new mongoose.Schema({
        roomName: String,
        messages: [{ userName: String, userId: String, message: String }]
    }, { timestamps: true });

    mongoose.model('Users', usersSchema);
    mongoose.model('Rooms', roomsSchema);
}
