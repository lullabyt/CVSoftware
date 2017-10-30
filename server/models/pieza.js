// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// create a schema
var piezaSchema = new Schema({

  idPieza: {
    type: String,
    required: true,
    unique: true
  },
  tipoPieza: {
    type: Schema.ObjectId,
    ref: "TipoPieza",
    required: true
  }
});


// the schema is useless so far
// we need to create a model using it
var Pieza = mongoose.model('Pieza', piezaSchema);

// make this available to our users in our Node applications
module.exports = Pieza;
