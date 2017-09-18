// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Get our API routes

const api = require('./server/routes/api');

const app = express();

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
//create a new user called chris
var orden = new Orden({
  numeroOrden: '1',
progreso: 'en curso',
observaciones: 'algo',
});

// call the built-in save method to save to the database
orden.save().then(function() {
  console.log('User saved successfully!');
}, function(err) {
  console.log(String(err));
});



//create a new personal

for (var i = 0; i < 5; i++) {
      var personal = new Personal({
      cuil: "76918371723"+i,
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
