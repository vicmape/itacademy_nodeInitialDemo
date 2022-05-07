
# Node Initial Project 4.1 - Victor

La solución al ejercicio se puede testear ejecutando desde la línea de comandos

    npm i
    npm start

Hay adjunta una coleción de postman para probar todos los endpoints en el fichero

    Postman collection 4.1

    *(NOTA: no he sabido como indicarle ruta relativa a las imagenes a subir para el endpoint /upload.
          Los ficheros a utilizar se encuentran en la carpeta "img" )*.

El ejercicio se estructura de la siguiente manera

    app.js -> Punto de entrada del programa. Se configuran los endpoints y se ejecuta el servidor express.

    /startup -> Ficheros a ejecutar en la inicialización.
      |
      |-- routes.js -> Definición de los endpoints

    /routes -> Declaración de los endpoints
      |
      |-- user.js
      |-- upload.js
      |-- time.js
      |-- pokemon.js
      |-- invalid.js

    /middlewares
      |
      |-- checkBasicAuth.js
      |-- cors.js
      |-- noCache.js

      /img -> Ficheros a utilizar en ejercicio del endpoint"/upload"
      |
      |-- troll.png
      |-- troll.jpg
      |-- troll.gif
      |-- troll.txt
