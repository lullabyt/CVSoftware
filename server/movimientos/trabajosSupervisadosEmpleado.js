const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

const VariablesGlobales = require('../utiles/variablesGlobales');



//MOVIMIENTO TRABAJOS SUPERVISADOS EMPLEADO


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


router.post('/registrarAsignacion', (req, res) => {

  var idInstrumento = req.body.instrumento;
  var modif = "";

  const urlAsignacion = VariablesGlobales.BASE_API_URL + '/api/asignaciones';
  const urlInstrumento = VariablesGlobales.BASE_API_URL + '/api/instrumentos/ocupado/' + idInstrumento;

  postContent(urlAsignacion, req.body, req.headers)
    .then((asig) =>
      res.json(asig),
      //Busca el instrumento y Actualiza el estado ya que ahora se encuentra en una asignacion
      putContent(urlInstrumento, modif)
    )
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

const postContent = function(url, postData, headers) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    //  const lib = url.startsWith('https') ? require('https') : require('http');

    var options = {
      method: 'post',
      body: postData, // Javascript object
      json: true, // Use,If you are sending JSON data
      url: url,
      headers: {
        // Specify headers, If any
        headers
      }
    };

    request = request(options, (err, response, body) => {
      // handle http errors
      if (err) {
        reject(err);
      } else {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error('Failed to load page, status code: ' + response.statusCode));
        }
        // temporary data holder
        const holder = [];
        // on every content chunk, push it to the data array
        response.on('data', (chunk) => holder.push(chunk));
        // we are done, resolve promise with those joined chunks
        response.on('end', () => resolve(holder.join('')));
      }

    });

  })
};


// funcion que realiza el http put

const putContent = function(url, putData) {
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


module.exports = router;
