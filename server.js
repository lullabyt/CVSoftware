// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');


//get rutas movimientos
const asignarPersonal = require('./server/movimientos/asignarPersonal');
const tipoPiezaInspeccionada = require('./server/movimientos/tipoPiezaInspeccionada');
const trabajosSupervisadosEmpleado = require('./server/movimientos/trabajosSupervisadosEmpleado');


// Get our API routes
const api = require('./server/routes/api');
const trabajos = require('./server/routes/trabajos');
const asignaciones = require('./server/routes/asignaciones');
const instrumentos = require('./server/routes/instrumentos');
const ordenes = require('./server/routes/ordenes');
const personal = require('./server/routes/personal');
const tipoInstrumentos = require('./server/routes/tipoInstrumentos');
const tipoTrabajos = require('./server/routes/tipoTrabajos');
const tipoPiezas = require('./server/routes/tipoPiezas');
const piezas = require('./server/routes/piezas');


const app = express();


//Import the mongoose module
var mongoose = require('mongoose');

//direccion a la base de datos
var dbURI = 'mongodb://localhost/bmInsp';


//Set up default mongoose connection
// connect to our database
mongoose.connect(dbURI, {
  keepAlive: true,
  reconnectTries: 10,
  useMongoClient: true
});

//mensajes de conexion
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function() {
  console.log('Mongoose connected a: ' + dbURI);
});
db.on('disconnected', function() {
  console.log('Mongoose disconnected');
});


// configure app to use bodyParser()
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Set rutas movimientos
app.use('/movimiento/asignarPersonal', asignarPersonal);
app.use('/movimiento/tipoPiezaInspeccionada', tipoPiezaInspeccionada);
app.use('/movimiento/trabajosSupervisadosEmpleado', trabajosSupervisadosEmpleado);


// Set our api routes
app.use('/api', api);
app.use('/api/trabajos', trabajos);
app.use('/api/asignaciones', asignaciones);
app.use('/api/instrumentos', instrumentos);
app.use('/api/ordenes', ordenes);
app.use('/api/personal', personal);
app.use('/api/tipoInstrumentos', tipoInstrumentos);
app.use('/api/tipoTrabajos', tipoTrabajos);
app.use('/api/tipoPiezas', tipoPiezas);
app.use('/api/piezas', piezas);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
