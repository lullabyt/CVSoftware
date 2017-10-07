const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

const VariablesGlobales = require('../utiles/variablesGlobales');
const Asignacion = require('../models/asignacion');



//MOVIMIENTO ASIGNAR PERSONAL


router.get('/', (req, res) => {

  res.send('Movimiento asignar personal. No has seleccionado ninguna opción!');

});



router.get('/obtenerOrdenes', (req, res) => {

  const urlOrdenes = VariablesGlobales.BASE_API_URL + '/api/ordenes';

  getContent(urlOrdenes)
    .then((ordenes) => res.send(ordenes))
    .catch((err) => res.send(err));

});



router.get('/obtenerTrabajosOrden/:_id', (req, res) => {

  var ordenServicio = req.params._id;

  const urlTrabajos = VariablesGlobales.BASE_API_URL + '/api/trabajos/' + ordenServicio;

  getContent(urlTrabajos)
    .then((trabajos) => res.send(trabajos))
    .catch((err) => res.send(err));

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



router.get('/obtenerInstrumentosTipoTrabajo/:_id', (req, res) => {

  var tipoTrabajo = req.params._id;

  const urlInstrumentos = VariablesGlobales.BASE_API_URL + '/api/instrumentos/' + tipoTrabajo;

  getContent(urlInstrumentos)
    .then((instrumentos) => res.send(instrumentos))
    .catch((err) => res.send(err));

});


router.post('/crearAsignacion', (req, res) => {

  const urlAsignacion = VariablesGlobales.BASE_API_URL + '/api/asignaciones/post';

  postContent(urlAsignacion,req.body)
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

// funcion que realiza el http post
const postContent = function(url,postData) {
return new Promise((resolve, reject) => {
  // return new pending promise
    // select http or https module, depending on reqested url
    //  const lib = url.startsWith('https') ? require('https') : require('http');

    var options = {
        method: 'post',
        body: postData, // Javascript object
        json: true, // Use,If you are sending JSON data
        url: url,
        headers: {
    // Specify headers, If any
      }
    }

      request(options, (err, response, body2) => {
        // handle http errors
      if(err){
        reject(err);
      }
    else   {
      if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error('Failed to load page, status code: ' + response.statusCode));
        }
        // temporary data holder
        const body = [];
        // on every content chunk, push it to the data array
        response.on('data', (chunk) => body.push(chunk));
        // we are done, resolve promise with those joined chunks
        response.on('end', () => resolve(body.join('')));
      }
      // handle connection errors of the request
    });


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
