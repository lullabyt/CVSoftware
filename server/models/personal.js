// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// create a schema
var personalSchema = new Schema({
  cuil: {
    type: String,
    required: true,
    unique: true
  },
  nombre: String,
  apellido: String,
  direccion: String,
  puesto: String,
  telefono: String
});

// we need to create a model using it
var Personal = mongoose.model('Personal', personalSchema);

// make this available to our users in our Node applications
module.exports = Personal;
