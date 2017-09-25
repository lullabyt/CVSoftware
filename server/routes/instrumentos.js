const express = require('express');
const router = express.Router();


var Instrumento = require('../models/instrumento');
var TipoTrabajo = require('../models/tipoTrabajo');


// Get all instrumentos
router.get('/', (req, res) => {

  Instrumento.find().then(function(instrumentos) {
    res.json(instrumentos);
  }, function(err) {
    res.send(err);

  });
});


// get todos los instrumentos que pueden ser usados para un tipo de trabajo determinado
// tienen que estar libres y aptos
router.get('/:_id', (req, res) => {

  TipoTrabajo.findById(req.params._id)
    .then(function(tipoTrabajo) {

      Instrumento.find({

        //busca todos los instrumentos que sean de tipos de instrumento requeridos por el tipo de trabajo
        tipoInstrumento: {
          $in: tipoTrabajo.tiposInstrumentos
        },
        //y que cumplan con las siguientes condiciones
        disponibilidad: 'libre',
        estado: 'apto'
      }).then(function(instrumentos) {
        res.json(instrumentos);

      }, function(err) {
        res.send(err);

      });

    }, function(err) {
      res.send(err);
    });

});


// make this available to our users in our Node applications
module.exports = router;
