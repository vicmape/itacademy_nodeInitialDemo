require('dotenv').config()
const Rooms = require('mongoose').model("Rooms")

module.exports = async (req, res) => {
    try {
        let rooms = await Rooms.find({});

        console.log(rooms)
        rooms = rooms.map(({_id, roomName})=> { 
            return {roomId:_id, roomName};
          });

        console.log(rooms)

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