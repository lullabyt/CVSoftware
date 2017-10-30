const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

const VariablesGlobales = require('../utiles/variablesGlobales');



//MOVIMIENTO TIPO PIEZA MAS INSPECCIONADA


router.get('/', (req, res) => {

//PRIMERO OBTIENE TRABAJOS DENTRO DEL PERÍODO
  const urlTrabajos = VariablesGlobales.BASE_API_URL + '/api/trabajos/porFecha/:'+req.body.fechaInicio+'/:'+req.body.fechaFin;
console.log("AHORA ESTA EN EL SERVIDOR!!");

    getContent(urlTrabajos)
      .then((trab) => {

        res.send(trab)
      })
      .catch((err) => res.send(err));

});

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


const postContent = function(url, postData) {
  console.log("esta en getcontent");
  // return new pending promise
  return new Promise((resolve, reject) => {

    //optiones para request post
    var options = {
      method: 'get',
      body: postData, // Javascript object
      json: true, // Use,If you are sending JSON data
      url: url,
      headers: {
        // Specify headers, If any
        //headers
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
      console.log(body);
      resolve(body);

    });

  })
};

module.exports = router;
