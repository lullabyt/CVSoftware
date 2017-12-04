const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

const VariablesGlobales = require('../utiles/variablesGlobales');
var TipoPieza = require('../models/tipoPieza');


//MOVIMIENTO TIPO PIEZA MAS INSPECCIONADA


router.get('/', (req, res) => {

  res.send('Movimiento tipo pieza inspeccionada. No has seleccionado ninguna opción!');

});


router.get('/obtenerTipoPieza', (req, res) => {

  if (isValidDate(req.query.fechaIni) && isValidDate(req.query.fechaFin) && req.query.fechaIni <= req.query.fechaFin) {

    const urlTrabajos = VariablesGlobales.BASE_API_URL + '/api/trabajos/fechas';

    getContentQuery(urlTrabajos, req.query)
      .then((trabajos) => {
        var i = 0;
        var idaux = null;
        for (variable of trabajos) {
          if (variable.count > i) {
            i = variable.count;
            idaux = variable._id;
          }
        }
        if (idaux != null) {
          const urlTipoPieza = VariablesGlobales.BASE_API_URL + '/api/tipoPiezas/' + idaux[0];
          getContentQuery(urlTipoPieza, null).then((tPieza) => {
            res.status(200).json({
              nombre: tPieza.nombre,
              descripcion: tPieza.descripcion,
              cantidad: i
            });
          })
        } else {

          res.status(200).json(null);
        }
      })
      .catch((err) =>   res.status(400).send(err));

  } else {

      res.status(400).send("formato dates invalido");
  }

});




const getContentQuery = function(url, queryData) {
  // return new pending promise
  return new Promise((resolve, reject) => {

    var options = {
      method: 'get',
      qs: queryData, // Javascript object
      json: true, // Use,If you are sending JSON data
      url: url
    };

    request(options, (err, response, body) => {
      // handle http errors
      if (err) {
        reject(err);
      }
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      //devuelve respuesta post
      resolve(body);

    });

  })
};


const isValidDate = function(dateString) {

  if(dateString){
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  if (!d.getTime()) return false; // Invalid date (or this could be epoch)
  return d.toISOString().slice(0, 10) === dateString;
  } else {return false;}

}



module.exports = router;
