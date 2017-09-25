const express = require('express');
const router = express.Router();


var Trabajo = require('../models/trabajo');


// Get all trabajos
router.get('/', (req, res) => {

  Trabajo.find({}, "numeroTrabajo fechaRealizacion evaluacion observacion ordenServicio tipoTrabajo")
    //  .populate('tipoTrabajo')
    .then(function(trabajos) {
      res.json(trabajos);
    }, function(err) {

      res.send(err);

    });
});


//get todos los trabajos pertenecientes a una orden especifica, junto con sus respectivos tipos de trabajo
router.get('/:_id', (req, res) => {
  Trabajo.find({
      ordenServicio: req.params._id,
      evaluacion: 'En curso'
    }, "numeroTrabajo fechaRealizacion evaluacion observacion ordenServicio tipoTrabajo")
    .populate(
      'tipoTrabajo')
    .then(function(trabajos) {
      res.json(trabajos);

    }, function(err) {
      res.send(err);
    });
});


// make this available to our users in our Node applications
module.exports = router;
