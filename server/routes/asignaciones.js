const express = require('express');
const router = express.Router();


var Asignacion = require('../models/asignacion');


//ruta /
router.route('/')

//Create de asignacion
.post((req, res) => {

  var asig = new Asignacion({
    trabajo: req.body.trabajo,
    personal: req.body.personal,
    instrumento: req.body.instrumento
  });

  //una vez creada se guarda en la base de datos
  asig.save().then(function() {
    res.json(asig);

  }, function(err) {
    res.send("Error al crear asignacion");
  });
})


//get all asignaciones
.get((req, res) => {
  Asignacion.find().then(function(asignaciones) {
    res.json(asignaciones);
  }, function(err) {
    res.send(err);
  });
});


// make this available to our users in our Node applications
module.exports = router;
