// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// create a schema
var trabajoSchema = new Schema({

  numeroTrabajo: {
    type: String,
    required: true,
    unique: true
  },
  fechaRealizacion: Date,
  evaluacion: { type: String, default:'En curso'},
  observacion: String,
  pieza: {
    type: Schema.ObjectId,
    ref: 'Pieza',
    required: true
  },
  ordenServicio: {
    type: Schema.ObjectId,
    ref: 'Orden',
    required: true
  }, //reference to the associated order
  tipoTrabajo: {
    type: Schema.ObjectId,
    ref: 'TipoTrabajo',
    required: true
  }, //reference to the associated trabajo
});

// the schema is useless so far
// we need to create a model using it
var Trabajo = mongoose.model('Trabajo', trabajoSchema);

// make this available to our users in our Node applications
module.exports = Trabajo;
