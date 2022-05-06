
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
    try{
        const data = {
            nom: "Victor",
            edat: "34",
            url: 'http://' + req.rawHeaders[1] + req.url
        };
        
        res.send(data);
        
    } catch (err){
       res.status(500).send(err.message);
    }
});

// N1 Ex2
app.post('/upload', (req, res) => {
    try {

        // Check if there is no req.file object
        if (!req.files) return res.status(400).send("File not found"); // 400 - Bad request

        // Check if there is more than 1 image
        if (Object.keys(req.files).length > 1) return res.status(400).send("Only one file allowed"); // 400 - Bad request

        // Get the key of the object
        let key = Object.keys(req.files);

        // Get the type of the image
        let type = req.files[key].mimetype;

        // Check the type of the image
        if (!type.match(/image\/(png|jpg|gif)$/)) return res.status(400).send(`Incorrect format ${type}`);

        // File successfully uploaded
        res.send(`FILE UPLOADED: ${req.files[key].name}`);
    
    } catch (err) {
        res.status(500).send(err.message); // 500 - Internal error
    }
});


function checkAuth(req, res, next){
    if (req.body.username !== "victor") return res.status(401).send("wrong user"); // 401 - Unauthorized
    if (req.body.password !== "1234") return res.status(401).send("wrong password"); // 401 - Bad request

    next();
}

// N2 Ex1 && N2 Ex2
app.post('/time', checkAuth, (req, res) => {
    if (!req.body.username) return res.status(400).send("'username' not found"); // 400 - Bad request
    if (!req.body.password) return res.status(400).send("'password' not found"); // 400 - Bad request

    const obj = {
        username: req.body.username,
        date: new Date()
    }

    res.send(obj);
});


// N3 Ex1
app.get('/pokemon/:id', (req, res) => {

    fetch('https://pokeapi.co/api/v2/pokemon/'+req.params.id)
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(data => {
      res.send({
          name: data.name,
          height: data.height,
          weight: data.weight
      });
    })
    .catch(err => {
      console.error(err);
    });
});

// Default route
app.get("*", (req, res) => {
    res.status(404).send("PAGE NOT FOUND"); // 404 - Resource not found
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening on port ${port}...`));
