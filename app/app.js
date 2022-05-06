
/*
Nivell 1

- Exercici 1
Crea un servidor amb Express que retorni a una petició GET a l'endpoint /user un json amb el teu nom, edat i la url des d'on es fa la petició.
Exercici 2
Afegeix un endpoint /upload per a pujar al servidor un arxiu de tipus png, jpg o gif que retorni un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.

Nivell 2
- Exercici 1
Creu un endpoint /time que rebi per POST com a paràmetre un JSON amb el nom d'usuari i retorni un objecte JSON que contingui l'hora i data actual. Inclogui un middleware que afegeixi la capçalera Cache-control: no-cache. Habiliti CORS (Cross-Origin Resource Sharing) en les respostes, ja sigui mitjançant Express o mitjançant un altre middleware.


Nivell 3
- Exercici 1
Afegeixi un middleware a l'endpoint anterior que retorni un HTTP Status 401 - Unauthorized si la capçalera de la petició no conté autenticació bàsica (usuari i contrasenya).
*/

////////////////////////////////////////////////////////////////////////////////
// IMPORTS /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fetch = require('cross-fetch');


////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARES /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const app = express();

// Enable Request Object as a JSON Object
app.use(express.json());

// Enable fileUpload
app.use(fileUpload({
    createParentPath: true
}));

// N2 Ex1 requirement
app.use(cors());

// N2 Ex1 requirement
app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-cache');
    next()
});


////////////////////////////////////////////////////////////////////////////////
// EXERCICES ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// N1 Ex1
app.get('/user', (req, res) => {
    try {
        res.send( {
            status: "success",
            data: {
                nom: "Victor",
                edat: "34",
                url: 'http://' + req.rawHeaders[1] + req.url
            }
        });

    } catch (err) {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
});

// N1 Ex2
app.post('/upload', (req, res) => {
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


function checkAuth(req, res, next){
    if (!req.body.username) return res.status(400).send({ status: "fail", message: "'username' not found"}); // 400 - Bad request
    if (!req.body.password) return res.status(400).send({ status: "fail", message: "'password' not found"}); // 400 - Bad request

    if (req.body.username !== "victor") return res.status(401).send({ status: "fail", message: "wrong user"}); // 401 - Unauthorized
    if (req.body.password !== "1234") return send({ status: "fail", message: "wrong password"}); // 401 - Unauthorized

    next();
}

// N2 Ex1 && N2 Ex2
app.post('/time', checkAuth, (req, res) => {
    try {
        res.send({
            status: "success",
            data: {
                username: req.body.username,
                date: new Date()
            }
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
});


// N3 Ex1
app.get('/pokemon/:id', (req, res) => {

    try {
        // Check if req.params.id is a natural number
        let isnum = /^\d+$/.test(req.params.id);

        if (!isnum) return res.status(400).send({ status: "fail", message: "Pokemon id must be a natural number"});

        fetch('https://pokeapi.co/api/v2/pokemon/'+req.params.id)
        .then(res => {
        if (res.status >= 400) {
            throw new Error(res.status);
        }
        return res.json();
        })
        .then(data => {
            res.send({
                status: "success",
                data: {
                    name: data.name,
                    height: data.height,
                    weight: data.weight
                }
            });
        })

    } catch(err) {

        let num = parseInt(err.message);

        if (num === 400) res.status(num).send({ status: "fail", message: "Bad request"});
        else if (num === 404) res.status(num).send({ status: "fail", message: "Resource not found"});
        else res.status(500).send({ status: "error", message: err.message });
    }
});

// Default route
app.get("*", (req, res) => {
    res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"});
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening on port ${port}...`));
