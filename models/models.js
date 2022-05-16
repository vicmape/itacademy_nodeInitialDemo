require('dotenv').config()

const mongoose = require('mongoose');

module.exports = () => {
    let mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    
    const usersSchema = new mongoose.Schema({ username: String, password: String }, { timestamps: true });

    mongoose.model('Users', usersSchema);
}
