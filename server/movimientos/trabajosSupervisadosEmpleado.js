const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

const VariablesGlobales = require('../utiles/variablesGlobales');



//MOVIMIENTO TRABAJOS SUPERVISADOS EMPLEADO


router.get('/', (req, res) => {

  res.send('Movimiento trabajos supervisados empleado. No has seleccionado ninguna opción!');

});


router.get('/obtenerPersonalLibre', (req, res) => {

  const urlPersonalLibre = VariablesGlobales.BASE_API_URL + '/api/personal/libre';

  getContent(urlPersonalLibre)
    .then((libre) => res.send(libre))
    .catch((err) => res.send(err));

});


router.get('/obtenerPersonalOcupado', (req, res) => {

  const urlPersonalOcupado = VariablesGlobales.BASE_API_URL + '/api/personal/ocupado';

  getContent(urlPersonalOcupado)
    .then((ocupado) => res.send(ocupado))
    .catch((err) => res.send(err));

});



router.get('/obtenerTrabajosSupervisadosEmpleado', (req, res) => {

  const urlAsignacion = VariablesGlobales.BASE_API_URL + '/api/trabajos/supervisadosEmpleado';

  getContentQuery(urlAsignacion, req.query)
    .then((asig) => {
      res.json(asig);
    })
    .catch((err) => res.send(err));
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


module.exports = router;
