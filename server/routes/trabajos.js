const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var Trabajo = require('../models/trabajo');
var Asignacion = require('../models/asignacion');
var TipoTrabajo = require('../models/tipoTrabajo');


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


router.get('/fechas', (req, res) => {
  var ini = new Date(req.query.fechaIni);
  var fin = new Date(req.query.fechaFin);
  Trabajo.aggregate([
    {
      $match: {
        fechaRealizacion: {
          $gte: ini,
          $lte: fin
        }
      }
    },
    {
      $unwind: "$pieza"
    },
  {
     $lookup:
        {
           from: "piezas",
           localField: "pieza",
           foreignField: "_id",
           as: "pieza"
       }
  },

    { $group :
      {
      _id : "$pieza.tipoPieza",
        count: { $sum: 1 }
      }

  }
]).then(function(trabajos) {
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
        //  .distinct('trabajo')
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


router.post('/', (req, res) => {
  console.log(req.body);

  var trabajo = new Trabajo({
    numeroTrabajo: req.body.numeroTrabajo,
    fechaRealizacion: req.body.fechaRealizacion,
    evaluacion: req.body.evaluacion,
    observacion: req.body.observacion,
    pieza: req.body.pieza,
    ordenServicio: req.body.ordenServicio,
    tipoTrabajo: req.body.tipoTrabajo
  });

  //una vez creada se guarda en la base de datos
  trabajo.save().then(function() {
    res.json(trabajo);

  }, function(err) {
    res.send("Error al crear trabajo");
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
