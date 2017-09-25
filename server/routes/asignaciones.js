const express = require('express');
const router = express.Router();


var Asignacion = require('../models/asignacion');
var Instrumento = require('../models/instrumento');


//get all asignaciones
router.get('/', (req, res) => {
  Asignacion.find().then(function(asignaciones) {
    res.json(asignaciones);
  }, function(err) {
    res.send(err);
  });
});


//Create de asignacion

router.post('/post', (req, res) => {

  var asig = new Asignacion({
    trabajo: req.body.trabajo,
    personal: req.body.personal,
    instrumento: req.body.instrumento
  });

  //una vez creada se guarda en la base de datos
  asig.save().then(function() {

    //Busca el instrumento y Actualiza el estado ya que ahora se encuentra en una asignacion
    Instrumento.findByIdAndUpdate(req.body.instrumento, {
      disponibilidad: 'ocupado'

    }).then(function() {
      res.send(asig);

    }, function(err) {
      res.send("Error al actualizar el instrumento");
    });

  }, function(err) {
    res.send("Error al crear asignacion");
  });
});



// make this available to our users in our Node applications
module.exports = router;
