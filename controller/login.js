module.exports = async (req, res) => {

    try {
        res.status(201).send({
            status: "success", 
            message: `${req.body.username.toLowerCase()} login successful`
        });

     } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}
