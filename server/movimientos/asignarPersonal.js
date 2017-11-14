const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

const VariablesGlobales = require('../utiles/variablesGlobales');



//MOVIMIENTO ASIGNAR PERSONAL


router.get('/', (req, res) => {

  res.status(200).json('Movimiento asignar personal. No has seleccionado ninguna opción!');

});



router.get('/obtenerOrdenes', (req, res) => {

  const urlOrdenes = VariablesGlobales.BASE_API_URL + '/api/ordenes';

  getContent(urlOrdenes)
    .then((ordenes) => res.status(200).json(ordenes))
    .catch((err) => res.send(err));

});



router.get('/obtenerTrabajosOrden/:_id', (req, res) => {

  var ordenServicio = req.params._id;

  const urlTrabajos = VariablesGlobales.BASE_API_URL + '/api/trabajos/' + ordenServicio;

  getContent(urlTrabajos)
    .then((trabajos) => res.status(200).json(trabajos))
    .catch((err) => res.send(err));

});



router.get('/obtenerPersonalLibre', (req, res) => {

  const urlPersonalLibre = VariablesGlobales.BASE_API_URL + '/api/personal/libre';

  getContent(urlPersonalLibre)
    .then((libre) => res.status(200).json(libre))
    .catch((err) => res.send(err));

});


router.get('/obtenerPersonalOcupado', (req, res) => {

  const urlPersonalOcupado = VariablesGlobales.BASE_API_URL + '/api/personal/ocupado';

  getContent(urlPersonalOcupado)
    .then((ocupado) => res.status(200).json(ocupado))
    .catch((err) => res.send(err));

});



router.get('/obtenerInstrumentosTipoTrabajo/:_id', (req, res) => {

  var tipoTrabajo = req.params._id;

  const urlInstrumentos = VariablesGlobales.BASE_API_URL + '/api/instrumentos/' + tipoTrabajo;

  getContent(urlInstrumentos)
    .then((instrumentos) => res.status(200).json(instrumentos))
    .catch((err) => res.send(err));

});


router.post('/registrarAsignacion', (req, res) => {

  var idInstrumento = req.body.instrumento;

  var modif = {

    disponibilidad: "ocupado"

  };

  const urlAsignacion = VariablesGlobales.BASE_API_URL + '/api/asignaciones';
  const urlInstrumento = VariablesGlobales.BASE_API_URL + '/api/instrumentos/' + idInstrumento;

  postContent(urlAsignacion, req.body, req.headers)
    .then((asig) => {

      //Busca el instrumento y Actualiza el estado ya que ahora se encuentra en una asignacion
      patchContent(urlInstrumento, modif, req.headers).then(() => {

        res.status(200).json(asig);
      })
    })
    .catch((err) => res.send(err));
});



// funcion que realiza el http get

const getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {

    var options = {
      method: 'get',
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



// funcion que realiza el http post

const postContent = function(url, postData, headers) {

  // return new pending promise
  return new Promise((resolve, reject) => {
    //optiones para request post
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


// funcion que realiza el http patch

const patchContent = function(url, patchData, headers) {
  // return new pending promise
  return new Promise((resolve, reject) => {

    //optiones para request patch
    var options = {
      method: 'patch',
      body: patchData, // Javascript object
      json: true, // Use,If you are sending JSON data
      url: url,
      headers: {
        // Specify headers, If any
        headers
      }
    };

    request(options, (err, response, body) => {
      // handle http errors
      if (err) {
        reject(err);
      }

      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      //devuelve respuesta patch
      resolve(body);
    });

  })
};


module.exports = router;
