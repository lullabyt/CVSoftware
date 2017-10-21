import { Component, OnInit } from '@angular/core';

//servicios
import { TipoPiezaInspeccionadaService } from '../../services/tipoPiezaInspeccionada.service';


//clases
import { Orden } from '../../classes/orden';
import { Trabajo } from '../../classes/trabajo';
import { Personal } from '../../classes/personal';
import { Instrumento } from '../../classes/instrumento';
import { Asignacion } from '../../classes/asignacion';

//sweet alert
declare var swal: any;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})


export class WizardTipoPiezaInspeccionadaComponent implements OnInit {

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

    private _tipoPiezaInspeccionadaService: TipoPiezaInspeccionadaService

  ) {

  }


  ngOnInit() {

    //obtenemos nombres de columnas de las tablas
    this.atributosOrden = this._tipoPiezaInspeccionadaService.getAtributosOrden();
    this.atributosInstrumento = this._tipoPiezaInspeccionadaService.getAtributosInstrumento();
    this.atributosTrabajo = this._tipoPiezaInspeccionadaService.getAtributosTrabajo();
    this.atributosPersonal = this._tipoPiezaInspeccionadaService.getAtributosPersonal();

    //se obtiene ordenes y personal
    this.getOrdenes();
    this.getPersonal();

  }


  // mensajes para el usuario en formato sweet alert

  errorInstrumento() {
    swal({
      title: 'Error!',
      text: 'Ningún instrumento se encuentra disponible en este momento. Pruebe más tarde.',
      type: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#3b3a30',
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }

  asignacionRealizada() {
    try {
      this._tipoPiezaInspeccionadaService.createAsignacion(this.selectedTrabajo._id, this.selectedPersonal._id, this.selectedInstrumento._id);

      swal({
        title: 'Hecho!',
        text: 'Asignación Realizada.',
        type: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      })

    } catch (err) {
      swal({
        title: 'Error!',
        text: 'No se pudo realizar la asignación. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
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
    })
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
    this._tipoPiezaInspeccionadaService.getOrdenes().then(ordenes => this.ordenes = ordenes);
  }



  //TRABAJOS

  //obtiene trabajos segun la orden seleccionada
  calcularTrabajos() {
    this._tipoPiezaInspeccionadaService.getTrabajosOrden(this.selectedOrden._id).then(trabajos => this.trabajos = trabajos);
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

    this._tipoPiezaInspeccionadaService.getPersonalLibre().then(personal => {
      var libres: Personal[];

      libres = personal;
      for (let personal of libres) {
        personal.asignado = 'Libre';
      };

      this._tipoPiezaInspeccionadaService.getPersonalOcupado().then(personal => {
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
    this._tipoPiezaInspeccionadaService.getInstrumentosTipoTrabajo(this.selectedTrabajo.tipoTrabajo._id).then(instrumentos => this.instrumentos = instrumentos);
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
    this.instrumentos = [];
    this.trabajos = [];
  }

  resetStep2() {
    this.selectedPersonal = null;
    this.selectedInstrumento = null;
    this.instrumentos = [];
  }

  resetStep3() {
    this.selectedInstrumento = null;
  }


}
