const express = require('express');
const router = express.Router();


var TipoTrabajo = require('../models/tipoTrabajo');


// Get all tipoTrabajos
router.get('/', (req, res) => {

  TipoTrabajo.find({}, "_id idTipoTrabajo nombre descripcion tiposInstrumentos").then(function(tipoTrabajos) {
    res.json(tipoTrabajos);
  }, function(err) {
    res.send(err);
  });
});


// make this available to our users in our Node applications
module.exports = router;
