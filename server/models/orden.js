// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// create a schema
var ordenSchema = new Schema({

  numeroOrden: {
    type: String,
    required: true,
    unique: true
  },
  progreso: String,
  observaciones: String,
  fechaIngreso: Date,
});

// on every save, add the date
ordenSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.fechaIngreso)
    this.fechaIngreso = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var Orden = mongoose.model('Orden', ordenSchema);

// make this available to our users in our Node applications
module.exports = Orden;
