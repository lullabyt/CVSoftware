const express = require('express');
const router = express.Router();

var Orden = require('../models/orden');

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

  Orden.find({}, "numeroOrden fechaIngreso progreso observaciones").then(function(ordenes) {
    res.json(ordenes);
  }, function(err) {
    res.send(err);
  });
});



module.exports = router;
