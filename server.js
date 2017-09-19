// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Get our API routes

const api = require('./server/routes/api');

const app = express();


var Trabajo = require('./server/models/trabajo');

var Orden = require('./server/models/orden');

var TipoTrabajo = require('./server/models/tipoTrabajo');



var Personal = require('./server/models/personal');
var Asignacion = require('./server/models/asignacion');
var Instrumento = require('./server/models/instrumento');
var TipoInstrumento = require('./server/models/tipoInstrumento');

//var Orden = require('./server/models/orden');
//var Personal = require('./server/models/personal');


//Import the mongoose module
var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/bmInsp';


//Set up default mongoose connection
// connect to our database
mongoose.connect(dbURI, {
  keepAlive: true,
  reconnectTries: 10,
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function() {
  console.log('Mongoose connected');
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

/*
var ins1 = new TipoInstrumento({
  idInstrumento: '1',
  nombre: "A",
  proposito: "algo"
});
var ins2 = new TipoInstrumento({
  idInstrumento: '2',
  nombre: "B",
  proposito: "algo"
});

var tipoTrabajo1 = new TipoTrabajo({
  idTipoTrabajo: '1',
  nombre: "pintura",
  descripcion: "algo",
  tiposInstrumentos: [ins1._id]
});
var tipoTrabajo2 = new TipoTrabajo({
  idTipoTrabajo: '2',
  nombre: "presion",
  descripcion: "algo",
  tiposInstrumentos: [ins2._id]
});



var inst = new Instrumento({
  numeroInstrumento: '1',
  nombre: "ins",
  estado: "perfecto",
  disponibilidad: "libre",
  tipoInstrumento: ins1._id
});

var orden = new Orden({
  numeroOrden: '3',
  progreso: "en curso",
  observaciones: "algo"
});


var trabajo = new Trabajo({
  numeroTrabajo: '1',
  observacion: 'algo',
  ordenServicio: orden._id,
  tipoTrabajo: tipoTrabajo1._id
});

ins1.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});

ins2.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});

tipoTrabajo1.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});

tipoTrabajo2.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});



inst.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});

//create a new user called chris


// call the built-in save method to save to the database
orden.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});


trabajo.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});


//create a new user called chris
var orden = new Orden({
  numeroOrden: '2',
  fechaIngreso: "2017-09-17",
  progreso: "en curso",
  observaciones: "algo"
});


//create a new user called chris
var tipoTrabajo = new TipoTrabajo({
  idTipoTrabajo: '2',
  nombre: "presion",
  descripcion: "algo"
});


//create a new user called chris
var trabajo = new Trabajo({
  numeroTrabajo: '1',
  observacion: 'algo',
  ordenServicio: orden._id,
  tipoTrabajo: tipoTrabajo._id
});

// call the built-in save method to save to the database
orden.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});

tipoTrabajo.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});


trabajo.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});

}

//create a new personal

for (var i = 0; i < 5; i++) {
  var personal = new Personal({
    cuil: "76918371723" + i,
    nombre: "Juan",
    apellido: "Perez",
    direccion: "una direccion",
    puesto: "un puesto",
    telefono: "12381313",
    asignado: "asignado"
  });

  // call the built-in save method to save to the database
  personal.save().then(function() {
    console.log('Personal saved successfully!');
  }, function(err) {
    console.log(String(err));
  });
}
*/

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
