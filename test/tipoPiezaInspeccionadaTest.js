//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;

let Trabajo = require('../server/models/trabajo');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let should = chai.should();

chai.use(chaiHttp);


describe('TRANSACCION tipoPiezaInspeccionada', () => {


//CAMINO CORRECTO

//Our parent block
describe('Ejecución tipoPiezaInspeccionada correcta', () => {

  describe('/GET tipoPieza', () => {

    it('it should GET tipo pieza mas inspeccionada', (done) => {
      let query = {
        fechaIni: '2016-11-10',
        fechaFin: '2016-11-10'
      };
      chai.request(server)
        .get('/movimientos/tipoPiezaInspeccionada/obtenerTipoPieza')
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          //res.body.should.be.a('object');
          //res.body.should.have.property('nombre');
          //res.body.should.have.property('descripcion');
          //res.body.should.have.property('cantidad');
          done();
        });
    });
  });

});


//CAMINO LISTAS VACIAS

//Our parent block
describe('Ejecución tipoPiezaInspeccionada pieza vacia', () => {

  describe('/GET tipoPieza', () => {

    beforeEach((done) => { //Before each test we empty the database
      Trabajo.remove({}, (err) => {
        done();
      });
    });

    it('it should GET pieza vacia', (done) => {
      let query = {
        fechaIni: '2016-11-10',
        fechaFin: '2016-11-10'
      };
      chai.request(server)
        .get('/movimientos/tipoPiezaInspeccionada/obtenerTipoPieza')
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body===null;

          done();
        });
    });
  });

});


//CAMINO INCORRECTO

//Our parent block
describe('Ejecución tipoPiezaInspeccionada incorrecta', () => {

  describe('/GET tipoPieza', () => {

    it('it should not GET tipo pieza mas inspeccionada', (done) => {
      let query = {
        fechaIni: '10-11-2016',
        fechaFin: '10-11-1015'
      };
      /*let query = {
        fechaIni: null,
        fechaFin: null
      };*/
      chai.request(server)
        .get('/movimientos/tipoPiezaInspeccionada/obtenerTipoPieza')
        .query(query)
        .end((err, res) => {
          res.should.have.status(400);
          //res.should.have.status(404);
          res.body.should.be.a('object');
          res.should.have.property('error');
          res.error.should.have.property('text').eql('formato dates invalido');
          done();
        });
    });

  });

});


});
