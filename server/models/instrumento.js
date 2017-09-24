// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

//var TipoInstrumento = mongoose.model('TipoInstrumento');

// create a schema
var instrumentoSchema = new Schema({

  numeroInstrumento: {
    type: String,
    unique: true,
    required: true
  },
  nombre: String,
  estado: {type: String, default: 'apto'},
  disponibilidad: {type: String, default: 'libre'},
  tipoInstrumento: {
    type: Schema.ObjectId,
    ref: "TipoInstrumento",
    required: true
  },
  fechaIngreso: Date,
});

// on every save, add the date
instrumentoSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.fechaIngreso)
    this.fechaIngreso = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var Instrumento = mongoose.model('Instrumento', instrumentoSchema);

// make this available to our users in our Node applications
module.exports = Instrumento;
