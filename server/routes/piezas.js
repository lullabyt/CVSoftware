const express = require('express');
const router = express.Router();


var Pieza = require('../models/pieza');



// Get all instrumentos
router.get('/', (req, res) => {

  Pieza.find().then(function(piezas) {
    res.json(piezas);
  }, function(err) {
    res.send(err);

  });
});

router.post('/',(req, res) => {

  var piez = new Pieza({
    idPieza: req.body.idPieza,
    tipoPieza: req.body.tipoPieza
  });

  //una vez creada se guarda en la base de datos
  piez.save().then(function() {
    res.json(piez);

  }, function(err) {
    res.send("Error al crear pieza");
  });
});

// make this available to our users in our Node applications
module.exports = router;
