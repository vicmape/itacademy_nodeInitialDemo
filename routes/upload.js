const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    // Check if there is no req.file object
    if (!req.files) return res.status(400).send({ status: "fail", message: "File not found"}); // 400 - Bad request
    
    // Check if there is more than 1 image
    if (Object.keys(req.files).length > 1) return res.status(400).send({ status: "fail", message: "One file allowed"}); // 400 - Bad request
    
    try {
        // Get the key of the object
        let key = Object.keys(req.files);

        // Get the type of the image
        let type = req.files[key].mimetype;

        // Check the type of the image
        if (!type.match(/image\/(png|jpg|jpeg|gif)$/)) return res.status(415).send({ status: "fail", message: `Unsupported media type ${type}`});

        // File successfully uploaded
        res.send({
            status: "success",
            data: {
                file_uploaded: `${req.files[key].name}`
            }
        });

    
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
});

module.exports = router;
