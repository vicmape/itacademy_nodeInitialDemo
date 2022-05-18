require('dotenv').config()
const Rooms = require('mongoose').model("Rooms")

module.exports = async (req, res) => {
    try {
        let rooms = await Rooms.find({});

        rooms = rooms.map(({_id, roomName})=> { 
            return {roomId:_id, roomName};
          });

        res.status(201).send({
            status: "success", 
            rooms
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
