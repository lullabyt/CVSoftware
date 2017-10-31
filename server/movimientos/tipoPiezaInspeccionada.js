const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

const VariablesGlobales = require('../utiles/variablesGlobales');
var TipoPieza = require('../models/tipoPieza');


//MOVIMIENTO TIPO PIEZA MAS INSPECCIONADA




router.get('/', (req, res) => {
  const urlTrabajos = VariablesGlobales.BASE_API_URL +'/api/trabajos/fechas';

  getContentQuery(urlTrabajos, req.query)
    .then((trabajos) => {

      //Aca hacer calculo y devolver resultado
      /*
      var resultado = {
      tipoPieza: TipoPieza = ,
      cantidad:Number = cant
    }
      */

      res.json(resultado);
    })
    .catch((err) => res.send(err));
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



module.exports = router;
