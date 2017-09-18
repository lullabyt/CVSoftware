// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// create a schema
var tipoTrabajoSchema = new Schema({

  idTipoTrabajo: {
    type: String,
    required: true,
    unique: true
  },
  nombre: String,
  descripcion: String,
});


// the schema is useless so far
// we need to create a model using it
var TipoTrabajo = mongoose.model('TipoTrabajo', tipoTrabajoSchema);

// make this available to our users in our Node applications
module.exports = TipoTrabajo;
