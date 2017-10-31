const express = require('express');
const router = express.Router();


var Trabajo = require('../models/trabajo');


// Get all trabajos
router.get('/', (req, res) => {

  Trabajo.find({}, "numeroTrabajo fechaRealizacion evaluacion observacion ordenServicio tipoTrabajo")
    //  .populate('tipoTrabajo')
    .then(function(trabajos) {
      res.json(trabajos);
      console.log(req.query);
    }, function(err) {

      res.send(err);

    });
});

router.get('/fechas',(req,res) => {
  console.log(req.query);
  Trabajo.find(
    {fechaRealizacion: {$gte : req.query.fechaIni, $lte: req.query.fechaFin}}
  ). populate(
    'pieza'
  ).then(function(trabajos) {
      res.json(trabajos);
      console.log(trabajos);
    }, function(err) {
      res.send(err);
    });
});

router.post('/',(req, res) => {
console.log(req.body);

  var trabajo = new Trabajo({
    numeroTrabajo: req.body.numeroTrabajo,
    fechaRealizacion: req.body.fechaRealizacion,
    evaluacion: req.body.evaluacion,
    observacion: req.body.observacion,
    pieza: req.body.pieza,
    ordenServicio: req.body.ordenServicio,
    tipoTrabajo: req.body.tipoTrabajo
  });

  //una vez creada se guarda en la base de datos
  trabajo.save().then(function() {
    res.json(trabajo);

  }, function(err) {
    res.send("Error al crear trabajo");
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
