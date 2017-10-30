const express = require('express');
const router = express.Router();


var Pieza = require('../models/instrumento');



// Get all instrumentos
router.get('/', (req, res) => {

  Pieza.find().then(function(piezas) {
    res.json(piezas);
  }, function(err) {
    res.send(err);

  });
});

// make this available to our users in our Node applications
module.exports = router;
