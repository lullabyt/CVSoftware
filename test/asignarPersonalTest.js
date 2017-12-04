//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;

let Orden = require('../server/models/orden');
let Trabajo = require('../server/models/trabajo');
let Personal = require('../server/models/personal');
let Instrumento = require('../server/models/instrumento');
let TipoTrabajo = require('../server/models/tipoTrabajo');
let Asignacion = require('../server/models/asignacion');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let should = chai.should();

chai.use(chaiHttp);


describe('TRANSACCION asignarPersonal', () => {


//CAMINO CORRECTO

//Our parent block
describe('Ejecución asignarPersonal correcta', () => {

  /*  beforeEach((done) => { //Before each test we empty the database
      Orden.remove({}, (err) => {
        done();
      });
    });*/

  /*
   * Test the /GET route
   */
  describe('/GET ordenes', () => {
    it('it should GET all the ordenes', (done) => {
      chai.request(server)
        .get('/movimientos/asignarPersonal/obtenerOrdenes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          //res.body.length.should.be.eql(0);
          res.body[0].should.have.property('numeroOrden');
          res.body[0].should.have.property('fechaIngreso');
          done();
        });
    });
  });




  /*describe('Trabajos', () => {
    beforeEach((done) => { //Before each test we empty the database
      Trabajo.remove({}, (err) => {
        done();
      });
    });*/

  describe('/GET/:idOrden trabajos', () => {
    it('it should GET trabajos by the given idOrden', (done) => {
      let idOrden = '59c832895deaf44392541a3c';
      chai.request(server)
        .get('/movimientos/asignarPersonal/obtenerTrabajosOrden/' + idOrden)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('numeroTrabajo');
          //res.body[0].should.have.property('pieza');
          res.body[0].should.have.property('ordenServicio');
          res.body[0].should.have.property('tipoTrabajo');
          //res.body[0].should.have.property('supervisor');
          res.body[0].should.have.property('ordenServicio').equals(idOrden);
          done();
        });
    });

  });


  /*describe('Personal', () => {
    beforeEach(() => { //Before each test we empty the database
      Personal.remove({})
        .then(() => Asignacion.remove({}))
        .catch((err) => {
          console.log(err);
          done();
        })
    });*/

  /*
   * Test the /GET route
   */
  describe('/GET personal libre', () => {
    it('it should GET all the personal libre', (done) => {
      chai.request(server)
        .get('/movimientos/asignarPersonal/obtenerPersonalLibre')
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
        .get('/movimientos/asignarPersonal/obtenerPersonalOcupado')
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

  /*describe('Instrumentos', () => {
    beforeEach(() => { //Before each test we empty the database
      TipoTrabajo.remove({})
        .then(() => Instrumento.remove({}))
        .catch((err) => {
          console.log(err);
          done();
        })
    });*/

  describe('/GET/:idTipoTrabajo instrumentos', () => {
    it('it should GET instrumentos by the given idTipoTrabajo', (done) => {
      let idTipoTrabajo = '59c832895deaf44392541a64';
      let idTipoInstrumento = '59c832895deaf44392541a61';
      chai.request(server)
        .get('/movimientos/asignarPersonal/obtenerInstrumentosTipoTrabajo/' + idTipoTrabajo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('numeroInstrumento');
          res.body[0].should.have.property('tipoInstrumento').equals(idTipoInstrumento);
          done();
        });
    });
  });



  /*describe('Trabajos', () => {
    beforeEach((done) => { //Before each test we empty the database
      Asignacion.remove({}, (err) => {
        done();
      });
    });*/
  /*
   * Test the /POST route
   */
  describe('/POST asignacion', () => {
    /*  it('it should not POST a book without pages field', (done) => {
        let book = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954
        }
        chai.request(server)
            .post('/book')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('pages');
                res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });*/
    it('it should POST a asignacion ', (done) => {
      let asignacion = {
        trabajo: ObjectId(),
        personal: ObjectId(),
        instrumento: ObjectId()
      }
      chai.request(server)
        .post('/movimientos/asignarPersonal/registrarAsignacion')
        .send(asignacion)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          //  res.body.should.have.property('message').eql('Book successfully added!');
          res.body.should.have.property('trabajo').eql(asignacion.trabajo.toString());
          res.body.should.have.property('personal').eql(asignacion.personal.toString());
          res.body.should.have.property('instrumento').eql(asignacion.instrumento.toString());
          done();
        });
    });
  });


});


//CAMINO LISTAS VACIAS

//Our parent block
describe('Ejecución asignarPersonal listas vacias', () => {


  describe('/GET ordenes', () => {

    beforeEach((done) => { //Before each test we empty the database
      Orden.remove({}, (err) => {
        done();
      });
    });

    it('it should GET lista vacia', (done) => {
      chai.request(server)
        .get('/movimientos/asignarPersonal/obtenerOrdenes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          //res.body[0].should.have.property('numeroOrden');
          //res.body[0].should.have.property('fechaIngreso');
          done();
        });
    });
  });


  describe('/GET/:idOrden trabajos', () => {

    beforeEach((done) => { //Before each test we empty the database
      Trabajo.remove({}, (err) => {
        done();
      });
    });

    it('it should GET lista vacia by the given idOrden', (done) => {
      let idOrden = '59c832895deaf44392541a3c';
      chai.request(server)
        .get('/movimientos/asignarPersonal/obtenerTrabajosOrden/' + idOrden)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          //res.body[0].should.have.property('numeroTrabajo');
          //res.body[0].should.have.property('pieza');
          //res.body[0].should.have.property('ordenServicio');
          //res.body[0].should.have.property('tipoTrabajo');
          //res.body[0].should.have.property('supervisor');
          //res.body[0].should.have.property('ordenServicio').equals(idOrden);
          done();
        });
    });

  });



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
        .get('/movimientos/asignarPersonal/obtenerPersonalLibre')
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
        .get('/movimientos/asignarPersonal/obtenerPersonalOcupado')
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


  describe('/GET/:idTipoTrabajo instrumentos', () => {

    beforeEach((done) => { //Before each test we empty the database
    TipoTrabajo.remove({}, (err) => {
        done();
      });
    });

    beforeEach((done) => { //Before each test we empty the database
    Instrumento.remove({}, (err) => {
        done();
      });
    });

    it('it should GET lista vacia by the given idTipoTrabajo', (done) => {
      let idTipoTrabajo = '59c832895deaf44392541a64';
      let idTipoInstrumento = '59c832895deaf44392541a61';
      chai.request(server)
        .get('/movimientos/asignarPersonal/obtenerInstrumentosTipoTrabajo/' + idTipoTrabajo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          //res.body[0].should.have.property('numeroInstrumento');
          //res.body[0].should.have.property('tipoInstrumento').equals(idTipoInstrumento);
          done();
        });
    });
  });


});


//CAMINO INCORRECTO

//Our parent block
describe('Ejecución asignarPersonal incorrecta', () => {


  describe('/GET/:idOrden trabajos', () => {
    it('it should not GET trabajos by the given incorrect idOrden', (done) => {
    //let idOrden = '';
    let idOrden = '123';
        chai.request(server)
          .get('/movimientos/asignarPersonal/obtenerTrabajosOrden/' + idOrden)
          .end((err, res) => {
            res.should.have.status(400);
            //res.should.have.status(404);
            res.body.should.not.be.a('array');
            res.should.have.property('error');
            res.error.should.have.property('text').eql('formato id invalido');
            done();
          });
      });

  });


  describe('/GET/:idTipoTrabajo instrumentos', () => {
    it('it should not GET instrumentos by the given incorrect idTipoTrabajo', (done) => {
    //  let idTipoTrabajo = '';
      let idTipoTrabajo = '7637';
      //let idTipoInstrumento = '59c832895deaf44392541a61';
      chai.request(server)
        .get('/movimientos/asignarPersonal/obtenerInstrumentosTipoTrabajo/' + idTipoTrabajo)
        .end((err, res) => {
          res.should.have.status(400);
          //res.should.have.status(404);
          res.body.should.not.be.a('array');
          res.should.have.property('error');
          res.error.should.have.property('text').eql('formato id invalido');
          done();
        });
    });
  });

  describe('/POST asignacion', () => {

    it('it should not POST an incorrect asignacion ', (done) => {
      let asignacion = {
        trabajo: 123,
        personal: 456,
        instrumento: 789
      }
      chai.request(server)
        .post('/movimientos/asignarPersonal/registrarAsignacion')
        .send(asignacion)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.should.have.property('error');
          res.error.should.have.property('text').eql('formato id invalido');
          done();
        });
    });
  });


});

});
