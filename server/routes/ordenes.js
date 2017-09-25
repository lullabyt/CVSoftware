const express = require('express');
const router = express.Router();


var Orden = require('../models/orden');


// Get all ordenes en curso
router.get('/', (req, res) => {

  Orden.find({
    progreso: 'En curso'
  }, "_id numeroOrden fechaIngreso progreso observaciones").then(function(ordenes) {
    res.json(ordenes);
  }, function(err) {
    res.send(err);
  });
});


// make this available to our users in our Node applications
module.exports = router;
