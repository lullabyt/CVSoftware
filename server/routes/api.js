const express = require('express');
const router = express.Router();

var Orden = require('../models/orden');
var Trabajo = require('../models/trabajo');
var TipoTrabajo = require('../models/tipoTrabajo');
var Personal = require('../models/personal');
var Asignacion = require('../models/asignacion');
var Instrumento = require('../models/instrumento');
var TipoInstrumento = require('../models/tipoInstrumento');

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all ordenes
router.get('/ordenes', (req, res) => {

  Orden.find({}, "_id numeroOrden fechaIngreso progreso observaciones").then(function(ordenes) {
    res.json(ordenes);
  }, function(err) {
    res.send(err);
  });
});


// Get all trabajos
router.get('/trabajos', (req, res) => {

  Trabajo.find({}, "numeroTrabajo fechaRealizacion evaluacion observacion ordenServicio tipoTrabajo")
    //  .populate('tipoTrabajo')
    .then(function(trabajos) {
      res.json(trabajos);
    }, function(err) {

      res.send(err);

    });
});


/*
router.get('/trabajos/:_id', (req, res) => {


  //console.log(req.params._id);
  //console.log(trabajos.toString());
  Trabajo.find({
      ordenServicio: req.params._id
    }, "numeroTrabajo fechaRealizacion evaluacion observacion ordenServicio tipoTrabajo")
    .populate(
      'tipoTrabajo')
    .then(function(trabajos) {
      //  TipoTrabajo.populate(trabajos, {
      //    path: "tipoTrabajo"
      //  }).then(function(trabajos) {

      res.json(trabajos);
        var or = orden;
        Trabajo.find({
          ordenServicio: or
        }, "numeroTrabajo fechaRealizacion evaluacion observacion tipoTrabajo ").then(function(trabajos) {
          res.json(trabajos);*/
      //  }, function(err) {
      //    res.send(err);
      //  });

    }, function(err) {
      res.send(err);
    });
}); */



router.get('/trabajos/:_id', (req, res) => {
  Trabajo.find({ ordenServicio: req.params._id }).
  populate('TipoTrabajo').
  exec(function (err, trabajos) {
    if (err) return handleError(err);
    console.log(trabajos + "noppp");
  });
});


// Get all tipoTrabajos
router.get('/tipoTrabajos', (req, res) => {

  TipoTrabajo.find({}, "_id idTipoTrabajo nombre descripcion tiposInstrumentos").then(function(tipoTrabajos) {
    res.json(tipoTrabajos);
  }, function(err) {
    res.send(err);
  });
});



router.get('/personal', (req, res) => {
  Personal.find().then(function(personal) {
    res.json(personal);
  }, function(err) {
    res.send(err);
  });
});


router.get('/instrumentos', (req, res) => {
  console.log(req.params)
  Instrumento.find().then(function(instrumentos) {
    res.json(instrumentos);
  }, function(err) {
    res.send(err);
  });
});


router.get('/asignaciones', (req, res) => {
  Asignacion.find().then(function(asignaciones) {
    res.json(asignaciones);
  }, function(err) {
    res.send(err);
  });
});


//Creates

router.post('/asignacion', (req, res) => {
  console.log("Entre a crear asignacion");
  var asig = new Asignacion({trabajo: req.body.trabajo, personal: req.body.personal, instrumento: req.body.instrumento});

asig.save().then(function(){
  console.log( 'se guardo la asignacion');
      res.send(asig);
    }, function(err){
      console.log(String(err));
      res.send("Error al crear asignacion");
    });
});


router.get('/tipoInstrumentos', (req, res) => {
  TipoInstrumento.find().then(function(tipoInstrumentos) {
    res.json(tipoInstrumentos);
  }, function(err) {
    res.send(err);
  });
});



module.exports = router;
