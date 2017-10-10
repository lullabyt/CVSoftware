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


//modificación instrumento particular a ocupado
router.get('/ocupado/:_id', (req, res) => {

  Instrumento.findByIdAndUpdate(req.params._id, {

    disponibilidad: "ocupado"

  }).then(function(ins) {
    res.json(ins);

  }, function(err) {
    res.send("Error al actualizar el instrumento");
  });


});


// get todos los instrumentos que pueden ser usados para un tipo de trabajo determinado
// tienen que estar libres y aptos

router.get('/:_idTipoTrabajo', (req, res) => {

  TipoTrabajo.findById(req.params._idTipoTrabajo)
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
