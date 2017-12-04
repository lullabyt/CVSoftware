//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;

let Trabajo = require('../server/models/trabajo');
let Personal = require('../server/models/personal');
let Asignacion = require('../server/models/asignacion');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let should = chai.should();

chai.use(chaiHttp);



describe('TRANSACCION trabajosSupervisadosEmpleado', () => {


//CAMINO CORRECTO

//Our parent block
describe('Ejecución trabajosSupervisadosEmpleado correcta', () => {


  describe('/GET personal libre', () => {
    it('it should GET all the personal libre', (done) => {
      chai.request(server)
        .get('/movimientos/trabajosSupervisadosEmpleado/obtenerPersonalLibre')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          //res.body.length.should.be.eql(0);
          res.body[0].should.have.property('cuil');
          res.body[0].should.have.property('nombre');
          res.body[0].should.have.property('apellido');
          done();
        });
    });
  });


  /*
   * Test the /GET route
   */
  describe('/GET personal ocupado', () => {
    it('it should GET all the personal ocupado', (done) => {
      chai.request(server)
        .get('/movimientos/trabajosSupervisadosEmpleado/obtenerPersonalOcupado')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          //res.body.length.should.be.eql(0);
          res.body[0].should.have.property('cuil');
          res.body[0].should.have.property('nombre');
          res.body[0].should.have.property('apellido');
          done();
        });
    });
  });


  describe('/GET obtenerTrabajosSupervisadosEmpleado', () => {

      it('it should GET trabajos supervisados por empleado', (done) => {
        let query = {
          fechaIni: '2016-11-10',
          fechaFin: '2017-11-10',
          empleado: '59c832895deaf44392541a6e'
        };
        chai.request(server)
          .get('/movimientos/trabajosSupervisadosEmpleado/obtenerTrabajosSupervisadosEmpleado')
          .query(query)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            //res.body[0].should.have.property('numeroTrabajo');
            //res.body[0].should.have.property('pieza');
            //res.body[0].should.have.property('ordenServicio');
            //res.body[0].should.have.property('tipoTrabajo');
            //res.body[0].should.have.property('supervisor');
            //res.body[0].should.have.property('ordenServicio');
            done();
          });
      });

    });


});


//CAMINO LISTAS VACIAS

//Our parent block
describe('Ejecución asignarPersonal listas vacias', () => {


  describe('/GET personal libre', () => {

    beforeEach((done) => { //Before each test we empty the database
    Personal.remove({}, (err) => {
        done();
      });
    });

    beforeEach((done) => { //Before each test we empty the database
    Asignacion.remove({}, (err) => {
        done();
      });
    });

    it('it should GET lista vacia', (done) => {
      chai.request(server)
        .get('/movimientos/trabajosSupervisadosEmpleado/obtenerPersonalLibre')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          //res.body[0].should.have.property('cuil');
          //res.body[0].should.have.property('nombre');
          //res.body[0].should.have.property('apellido');
          done();
        });
    });
  });


  describe('/GET personal ocupado', () => {

    beforeEach((done) => { //Before each test we empty the database
    Personal.remove({}, (err) => {
        done();
      });
    });

    beforeEach((done) => { //Before each test we empty the database
    Asignacion.remove({}, (err) => {
        done();
      });
    });

    it('it should GET lista vacia', (done) => {
      chai.request(server)
        .get('/movimientos/trabajosSupervisadosEmpleado/obtenerPersonalOcupado')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          //res.body[0].should.have.property('cuil');
          //res.body[0].should.have.property('nombre');
          //res.body[0].should.have.property('apellido');
          done();
        });
    });
  });


    describe('/GET obtenerTrabajosSupervisadosEmpleado', () => {

      beforeEach((done) => { //Before each test we empty the database
        Trabajo.remove({}, (err) => {
          done();
        });
      });

      it('it should GET lista vacia', (done) => {
        let query = {
          fechaIni: '2016-11-10',
          fechaFin: '2016-11-10',
          empleado: '59c832895deaf44392541a6e'
        };
        chai.request(server)
          .get('/movimientos/trabajosSupervisadosEmpleado/obtenerTrabajosSupervisadosEmpleado')
          .query(query)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });

});


//CAMINO INCORRECTO

//Our parent block
describe('Ejecución trabajosSupervisadosEmpleado incorrecta', () => {

  describe('/GET obtenerTrabajosSupervisadosEmpleado', () => {

    it('it should not GET trabajos supervisados por empleado (incorrect dates)', (done) => {
      let query = {
        fechaIni: '10-11-2016',
        fechaFin: '10-11-1015',
        empleado: '59c832895deaf44392541a6e'
      };
      chai.request(server)
        .get('/movimientos/trabajosSupervisadosEmpleado/obtenerTrabajosSupervisadosEmpleado')
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


    it('it should not GET trabajos supervisados por empleado (incorrect id)', (done) => {
      let query = {
        fechaIni: '2016-11-10',
        fechaFin: '2016-11-10',
        empleado: '12342'
      };
      chai.request(server)
        .get('/movimientos/trabajosSupervisadosEmpleado/obtenerTrabajosSupervisadosEmpleado')
        .query(query)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.should.have.property('error');
          res.error.should.have.property('text').eql('formato id empleado invalido');
          done();
        });
    });

  });

});


});
