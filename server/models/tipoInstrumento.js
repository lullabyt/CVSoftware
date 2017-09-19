// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// create a schema
var tipoInstrumentoSchema = new Schema({

  idInstrumento:{
    type: String,
    unique: true,
    required: true
  },
  nombre: String
});


// the schema is useless so far
// we need to create a model using it
var TipoInstrumento = mongoose.model('TipoInstrumento', tipoInstrumentoSchema);

// make this available to our users in our Node applications
module.exports = TipoInstrumento;
