// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// create a schema
var TipoPieza = new Schema({

  idTipoPieza:{
    type: String,
    unique: true,
    required: true
  },
  nombre: String,
  descripcion: String
});


// the schema is useless so far
// we need to create a model using it
var TipoPieza = mongoose.model('TipoPieza', TipoPieza);

// make this available to our users in our Node applications
module.exports = TipoPieza;
