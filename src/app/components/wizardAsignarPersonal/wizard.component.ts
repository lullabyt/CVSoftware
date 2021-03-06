import { Component, OnInit } from '@angular/core';

//servicios
import { AsignarPersonalService } from '../../services/asignarPersonal.service';

/*
import { OrdenesService } from '../../services/ordenes.service';
import { TrabajosService } from '../../services/trabajos.service';
import { PersonalService } from '../../services/personal.service';
import { InstrumentoService } from '../../services/instrumento.service';
import { AsignacionService } from '../../services/asignacion.service';
*/


//clases
import { Orden } from '../../classes/orden';
import { Trabajo } from '../../classes/trabajo';
import { Personal } from '../../classes/personal';
import { Instrumento } from '../../classes/instrumento';
import { Asignacion } from '../../classes/asignacion';

//sweet alert
import swal from 'sweetalert2';
//declare var swal: any;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})


export class WizardAsignarPersonalComponent implements OnInit {

  selectedOrden: Orden = null;
  private ordenes: Orden[] = [];
  private atributosOrden: string[] = [];

  selectedTrabajo: Trabajo = null;
  private trabajos: Trabajo[] = [];
  private atributosTrabajo: string[] = [];

  selectedPersonal: Personal = null;
  private personal: Personal[] = [];
  private atributosPersonal: string[] = [];

  selectedInstrumento: Instrumento = null;
  private instrumentos: Instrumento[] = [];
  private atributosInstrumento: string[] = [];


  constructor(
    /*
        private _ordenesService: OrdenesService,
        private _trabajosService: TrabajosService,
        private _personalService: PersonalService,
        private _instrumentoService: InstrumentoService,
        private _asignacionService: AsignacionService
    */
    private _asignarPersonalService: AsignarPersonalService

  ) {

  }


  ngOnInit() {

    //obtenemos nombres de columnas de las tablas
    this.atributosOrden = this._asignarPersonalService.getAtributosOrden();
    this.atributosInstrumento = this._asignarPersonalService.getAtributosInstrumento();
    this.atributosTrabajo = this._asignarPersonalService.getAtributosTrabajo();
    this.atributosPersonal = this._asignarPersonalService.getAtributosPersonal();

    //se obtiene ordenes
    this.getOrdenes();

  }


  // mensajes para el usuario en formato sweet alert

  errorInstrumento() {
    swal({
      title: 'Sin instrumentos!',
      text: 'Ningún instrumento para ' + this.selectedTrabajo.tipoTrabajo.nombre + ' se encuentra disponible en este momento. Pruebe más tarde.',
      type: 'warning',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#3b3a30',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  asignacionRealizada() {
    try {
      this._asignarPersonalService.createAsignacion(this.selectedTrabajo._id, this.selectedPersonal._id, this.selectedInstrumento._id);

      swal({
        title: 'Hecho!',
        text: 'Asignación Realizada.',
        type: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });

    } catch (err) {
      swal({
        title: 'Error!',
        text: 'No se pudo realizar la asignación. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    };
  }

  confirmacion() {

    swal({
      title: 'Reset',
      text: "Ha regresado al primer paso.",
      type: 'info',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#3b3a30',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }


  //ORDENES

  onSelectOrden(orden: Orden): void {

    this.selectedOrden = orden;
  }

  isOrdenSelected(orden: Orden) { return orden === this.selectedOrden; }

  ordenVacia() {
    return this.selectedOrden === null;
  }

  //obtiene ordenes
  getOrdenes(): void {
    this._asignarPersonalService.getOrdenes().then(ordenes => this.ordenes = ordenes);
  }



  //TRABAJOS

  //obtiene trabajos segun la orden seleccionada
  calcularTrabajos() {
    this._asignarPersonalService.getTrabajosOrden(this.selectedOrden._id).then(trabajos => this.trabajos = trabajos);
  }


  onSelectTrabajo(trabajo: Trabajo): void {
    this.selectedTrabajo = trabajo;
  }

  isTrabajoSelected(trabajo: Trabajo) { return trabajo === this.selectedTrabajo; }

  trabajoVacia() {
    return this.selectedTrabajo === null;
  }



  //PERSONAL

  isPersonalSelected(personal: Personal) { return personal === this.selectedPersonal; }

  personalVacia() {
    return this.selectedPersonal === null;
  }

  onSelectPersonal(personal: Personal): void {

    this.selectedPersonal = personal;
  }

  //obtiene personal libre y ocupado de manera de brindar mas informacion al usuario ademas de obtener solo el personal
  getPersonal(): void {

    this._asignarPersonalService.getPersonalLibre().then(personal => {
      var libres: Personal[];

      libres = personal;
      for (let personal of libres) {
        personal.asignado = 'Libre';
      };

      this._asignarPersonalService.getPersonalOcupado().then(personal => {
        var ocupados: Personal[];

        ocupados = personal;

        for (let personal of ocupados) {
          personal.asignado = 'Ocupado';
        };
        this.personal = libres.concat(ocupados);
      });
    });

  }

  /*
  //metodo anterior

    getPersonal(): void {
      this._personalService.getPersonalLibre().then(personal => this.personal = personal);
    }
    */



  // INSTRUMENTOS

  // obtiene instrumentos segun el tipo de trabajo del trabajo seleccionado
  calcularInstrumentos() {
    this._asignarPersonalService.getInstrumentosTipoTrabajo(this.selectedTrabajo.tipoTrabajo._id).then(instrumentos => this.instrumentos = instrumentos);
  }

  isInstrumentoSelected(instrumento: Instrumento) { return instrumento === this.selectedInstrumento; }

  instrumentoVacia() {
    return this.selectedInstrumento === null;
  }

  hayInstrumentos() {
    return this.instrumentos.length > 0;
  }

  onSelectInstrumento(instrumento: Instrumento): void {
    this.selectedInstrumento = instrumento;
  }



  //Reset pasos del wizard
  //de manera que no quede informacion desactualizada al volver a pasos anteriores

  resetStep1() {
    this.selectedTrabajo = null;
    this.selectedPersonal = null;
    this.selectedInstrumento = null;
    this.personal = [];
    this.instrumentos = [];
    this.trabajos = [];
  }

  resetStep2() {
    this.selectedPersonal = null;
    this.selectedInstrumento = null;
    this.personal = [];
    this.instrumentos = [];
  }

  resetStep3() {
    this.selectedInstrumento = null;
  }


}
