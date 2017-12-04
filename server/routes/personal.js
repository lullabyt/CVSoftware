const express = require('express');
const router = express.Router();


var Personal = require('../models/personal');
var Asignacion = require('../models/asignacion');


// Get all personal
router.get('/', (req, res) => {
  Personal.find().then(function(personal) {
    res.json(personal);
  }, function(err) {
    res.send(err);
  });
});


//retorna todo el personal asociado asignaciones actuales (ocupado)
router.get('/ocupado', (req, res) => {

  Asignacion.find({
      progreso: 'En curso'
    })
    //  .distinct('trabajo')
    .populate(
      'personal')
    .then(function(asignaciones) {

      var pers = [];
      if (asignaciones.length > 0) {
        for (asignacion of asignaciones) {
          if (!pers.includes(asignacion.personal)) {
            pers.push(asignacion.personal);
          }
        }
      }
      /*  asignaciones.forEach(function(asignacion) {
          console.log("hey" + pers);
          pers.push(asignacion.personal);

        })*/

      res.json(pers);

    }, function(err) {
      res.send(err);
    });

});


//retorna todo el personal que no esta asociado a asignaciones actuales (libre)
router.get('/libre', (req, res) => {

  Asignacion.find({
      progreso: 'En curso'
    })
    .then(function(asignaciones) {

      var pers = [];
      if (asignaciones.length > 0) {
        for (asignacion of asignaciones) {
          pers.push(asignacion.personal);
        }
      }
      /*
      asignaciones.forEach(function(asignacion) {

        pers.push(asignacion.personal);

      });*/

      // si la persona no esta en el arreglo pers entonces no se encuentra asignado
      Personal.find({
        _id: {
          $nin: pers
        }
      }).then(function(personal) {
        res.json(personal);

      }, function(err) {
        res.send(err);
      });

    }, function(err) {
      res.send(err);
    });

});


// make this available to our users in our Node applications
module.exports = router;
