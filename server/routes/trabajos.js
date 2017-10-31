const express = require('express');
const router = express.Router();


var Trabajo = require('../models/trabajo');
var Asignacion = require('../models/asignacion');


// Get all trabajos
router.get('/', (req, res) => {

  Trabajo.find({})
    //  .populate('tipoTrabajo')
    .then(function(trabajos) {
      res.json(trabajos);
    }, function(err) {

      res.send(err);

    });
});



//obtiene los trabajos supervisados por un empleado entre un periodo de fechas
router.get('/supervisadosEmpleado', (req, res) => {


  Trabajo.find({
      supervisor: req.query.empleado
    }, "_id")
    .then(function(trabajos) {

        let arr = [];

        if (trabajos.length > 0) {
          for (var i in trabajos) {
            arr.push(trabajos[i]._id);
          }
        }
        Asignacion.find({
            trabajo: {
              $in: arr
            },
            fechaAsignacion: {
              $gte: req.query.fechaIni,
              $lte: req.query.fechaFin
            }

          }, "trabajo -_id")
          .populate({
            path: 'trabajo',
            populate: {
              path: 'tipoTrabajo'
            }
          })
          .then(function(trabajosAsig) {
            res.json(trabajosAsig);

          }, function(err) {
            res.send(err);
          });

      },
      function(err) {

        res.send(err);

      });


});



//get todos los trabajos pertenecientes a una orden especifica, junto con sus respectivos tipos de trabajo
router.get('/:_id', (req, res) => {
  Trabajo.find({
      ordenServicio: req.params._id,
      evaluacion: 'En curso'
    })
    .populate(
      'tipoTrabajo')
    .then(function(trabajos) {
      res.json(trabajos);

    }, function(err) {
      res.send(err);
    });
});




// make this available to our users in our Node applications
module.exports = router;
