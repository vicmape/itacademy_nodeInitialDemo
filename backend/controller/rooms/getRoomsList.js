require('dotenv').config()
const Rooms = require('mongoose').model("Rooms")

module.exports = async (req, res) => {
    try {
        let rooms = await Rooms.find({});

        rooms.map(({_id, name})=> { 
            return {_id, name};
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
