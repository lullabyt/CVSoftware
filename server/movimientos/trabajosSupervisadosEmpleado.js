const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

const VariablesGlobales = require('../utiles/variablesGlobales');


var ObjectId = require('mongoose').Types.ObjectId;


//MOVIMIENTO TRABAJOS SUPERVISADOS EMPLEADO


router.get('/', (req, res) => {

  res.send('Movimiento trabajos supervisados empleado. No has seleccionado ninguna opción!');

});


router.get('/obtenerPersonalLibre', (req, res) => {

  const urlPersonalLibre = VariablesGlobales.BASE_API_URL + '/api/personal/libre';

  getContentQuery(urlPersonalLibre, null)
    .then((libre) => res.status(200).json(libre))
    .catch((err) => res.send(err));

});


router.get('/obtenerPersonalOcupado', (req, res) => {

  const urlPersonalOcupado = VariablesGlobales.BASE_API_URL + '/api/personal/ocupado';

  getContentQuery(urlPersonalOcupado, null)
    .then((ocupado) => res.status(200).json(ocupado))
    .catch((err) => res.send(err));

});



router.get('/obtenerTrabajosSupervisadosEmpleado', (req, res) => {

  if (isValidDate(req.query.fechaIni) && isValidDate(req.query.fechaFin) && req.query.fechaIni <= req.query.fechaFin) {

    if (checkObjectId(req.query.empleado)) {

      const urlAsignacion = VariablesGlobales.BASE_API_URL + '/api/trabajos/supervisadosEmpleado';

      getContentQuery(urlAsignacion, req.query)
        .then((asig) => {
          res.status(200).json(asig);
        })
        .catch((err) => res.send(err));

    } else {

      res.send("formato id empleado invalido");
    }


  } else {

    res.send("formato dates invalido");
  }


});



// funcion que realiza el http get

const getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    //  const lib = url.startsWith('https') ? require('https') : require('http');
    const request = http.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};



// funcion que realiza el http get con query

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



// funcion que verifica formato ObjectId

const checkObjectId = function(id) {

  if (ObjectId.isValid(id)) {

    var prueba = new ObjectId(id);

    if (prueba == id) {
      return true

    } else {
      return false
    }

  } else {
    return false
  }

};


const isValidDate = function(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  if (!d.getTime()) return false; // Invalid date (or this could be epoch)
  return d.toISOString().slice(0, 10) === dateString;
}




module.exports = router;
