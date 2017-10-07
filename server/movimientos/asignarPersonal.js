const http = require('http');
const express = require('express');
const router = express.Router();

const VariablesGlobales = require('../utiles/variablesGlobales');



//MOVIMIENTO ASIGNAR PERSONAL


router.get('/', (req, res) => {

  res.send('Movimiento asignar personal. No has seleccionado ninguna opción!');

});



router.get('/obtenerOrdenes', (req, res) => {

  const urlOrdenes = VariablesGlobales.BASE_API_URL + '/api/ordenes';

  getContent(urlOrdenes)
    .then((html) => res.send(html))
    .catch((err) => res.send(err));

});



router.get('/obtenerTrabajosOrden/:_id', (req, res) => {

  var ordenServicio = req.params._id;

  const urlTrabajos = VariablesGlobales.BASE_API_URL + '/api/trabajos/' + ordenServicio;

  getContent(urlTrabajos)
    .then((html) => res.send(html))
    .catch((err) => res.send(err));

});



router.get('/obtenerPersonalLibre', (req, res) => {

  const urlPersonalLibre = VariablesGlobales.BASE_API_URL + '/api/personal/libre';

  getContent(urlPersonalLibre)
    .then((html) => res.send(html))
    .catch((err) => res.send(err));

});


router.get('/obtenerPersonalOcupado', (req, res) => {

  const urlPersonalOcupado = VariablesGlobales.BASE_API_URL + '/api/personal/ocupado';

  getContent(urlPersonalOcupado)
    .then((html) => res.send(html))
    .catch((err) => res.send(err));

});



router.get('/obtenerInstrumentosTipoTrabajo/:_id', (req, res) => {

  var tipoTrabajo = req.params._id;

  const urlInstrumentos = VariablesGlobales.BASE_API_URL + '/api/instrumentos/' + tipoTrabajo;

  getContent(urlInstrumentos)
    .then((html) => res.send(html))
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



/*
  http.get({
    hostname: 'localhost',
    port: 3000,
    path: '/api/ordenes',
    agent: false // create a new agent just for this one request
  }, (response) => {
    // Do stuff with response
    // Continuously update stream with data
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {

      // Data reception is done, do whatever with it!
      //var parsed = JSON.parse(body);
      res.send(body);
    });
  });

*/

/*
Asignacion.find().then(function(asignaciones) {
  res.json(asignaciones);
}, function(err) {
  res.send(err);
});



function getTestPersonaLoginCredentials(callback) {

    return http.get({
        host: 'personatestuser.org',
        path: '/email'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback({
                email: parsed.email,
                password: parsed.pass
            });
        });
    });

},
*/


module.exports = router;
