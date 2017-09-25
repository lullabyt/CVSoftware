const express = require('express');
const router = express.Router();

var TipoInstrumento = require('../models/tipoInstrumento');


//get all tipos de instrumento
router.get('/', (req, res) => {
  TipoInstrumento.find().then(function(tipoInstrumentos) {
    res.json(tipoInstrumentos);
  }, function(err) {
    res.send(err);
  });
});



// make this available to our users in our Node applications
module.exports = router;
