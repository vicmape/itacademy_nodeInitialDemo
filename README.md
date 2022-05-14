
# Sprint 4 - Ex 4.2 

Niveles 1 y 3 solucionados. El nivel 2 no lo haré ya que con el chat usaré mongoose en vez de sequelize.

## Inicialización proyecto

1- Renombrar/copiar el fichero .env-template -> .env
2- Setear los valores de tu servidor de MySQL (DB_USER, DB_PASS) y el puerto en el que se quiere ejectuar la API (API_PORT)
3- Instalar dependencias ejecutando en linea de comandos

  npm i

4- Ejectuar el proyecto

  npm start

## Testeo de la solución

Para testear NO he usado postman. 
He usado una extension de Visual Studio Code: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
Muy intuitiva y facil de utilizar. 

*Los ficheros con todos las requests a enviar las puedes encontrar en la carpeta _http_request* 

Para enviar las requests verás que, una vez instalada la extensión, aparece un pequeño botón "send request" encima de cada request.


## Notas sobre la solución

He creado los siguientes endpoints. Pienso que tienen más sentido que los que pide el enunciado

get /players        -> Devuelve listado de jugadores con su id
post /players       -> Agrega un player (username = ANONIMO por defecto)
put /players/:id    -> Cambia el username del player con :id
delete /players/:id -> Borra el player con :id (Habilitado solo a usuario administrador que proporciona JWT)

get /games/:id      -> Devuelve todos los lanzamientos del player :id
post /games/:id     -> El player :id realiza un lanzamiento de dados
delete /games/:id   -> Se borran todos los lanzamientos del player :id (Habilitado solo a usuario administrador que proporciona JWT)

get /ranking        -> Devuelve el ranking de todos los jugadores
get /ranking/winner -> Devuelve el jugador que tiene mayor porcentage de victorias
get /ranking/loser  -> Devuelve el jugador que tiene menor porcentage de victorias

post /login/register -> Registra un usuario como administrador en el sistema. Utiliza la libreria bcrypt para guardar el password hasheado en base de datos
post /login          -> Obtencion del JWT si se autentica un usuario previamente registrado como administrador.