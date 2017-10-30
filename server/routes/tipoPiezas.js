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



// make this available to our users in our Node applications
module.exports = router;
