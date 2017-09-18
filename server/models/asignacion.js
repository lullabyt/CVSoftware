// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
//var Trabajo = mongoose.model('Trabajo');
var Personal = mongoose.model('Personal');
//var Instrumento = mongoose.model('Instrumento');

// create a schema
var asignacionSchema = new Schema({
  progreso: String,
  fechaAsignacion: Date,
  //Trabajo: { type: Schema.ObjectId, ref: "Trabajo" },
  Personal:{ type: Schema.ObjectId, ref: "Personal" }
  //Instrumento: { type: Schema.ObjectId, ref: "Instrumento" } 
});

// on every save, add the date
asignacionSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.fechaAsignacion)
    this.fechaAsignacion = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var Asignacion = mongoose.model('Asignacion', asignacionSchema);

// make this available to our users in our Node applications
module.exports = Asignacion;
