const express = require('express');
const router = express.Router();


var TipoPieza = require('../models/tipoPieza');


//get all tipos de instrumento
router.get('/', (req, res) => {
  TipoPieza.find().then(function(tipoPiezas) {
    res.json(tipoPiezas);
  }, function(err) {
    res.send(err);
  });
});

router.post('/',(req, res) => {
  var tipo = new TipoPieza({
    idTipoPieza: req.body.idTipoPieza,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  });

  //una vez creada se guarda en la base de datos
  tipo.save().then(function() {
    res.json(tipo);

  }, function(err) {
    res.send("Error al crear tipo");
  });
});



// make this available to our users in our Node applications
module.exports = router;
