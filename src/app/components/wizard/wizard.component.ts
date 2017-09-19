import { Component, OnInit } from '@angular/core';

import { OrdenesService } from '../../services/ordenes.service';
import { TrabajosService } from '../../services/trabajos.service';
import { PersonalService } from '../../services/personal.service';
import { InstrumentoService } from '../../services/instrumento.service';
import { AsignacionService } from '../../services/asignacion.service';
import { Orden } from '../../classes/orden';
import { Trabajo } from '../../classes/trabajo';
import { Personal } from '../../classes/personal';
import { Instrumento } from '../../classes/instrumento';
import { Asignacion } from '../../classes/asignacion';


declare var swal: any;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

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

  conf: boolean = false;

  constructor(
    private _ordenesService: OrdenesService,
    private _trabajosService: TrabajosService,
    private _personalService: PersonalService,
    private _instrumentoService: InstrumentoService,
    private _asignacionService: AsignacionService

  ) {

  }

  getOrdenes(): void {
    this._ordenesService.getOrdenes().then(ordenes => this.ordenes = ordenes);
  }
  getPersonal(): void {
    this._personalService.getPersonal().then(personal => this.personal = personal);
  }


  ngOnInit() {
    this.atributosOrden = this._ordenesService.getAtributos();

    this.getOrdenes();
    //this.ordenes = this._ordenesService.getOrdenes();

    this.atributosTrabajo = this._trabajosService.getAtributos();

    this.atributosPersonal = this._personalService.getAtributos();

    //asignar personal de todos los trabajos en curso
    //  this.personal = this._personalService.getPersonal();
    this.getPersonal();
    // ver calcularTrabajos()
    //this.trabajos = this._trabajosService.getTrabajos();

    this.atributosInstrumento = this._instrumentoService.getAtributos();

  }


  errorInstrumento() {
    swal({
      title: 'Error!',
      text: 'Ningún instrumento se encuentra disponible en este momento. Pruebe más tarde.',
      type: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#3b3a30'
    })
  }

  asignacionRealizada() {
    var asig = this._asignacionService.createAsignacion(this.selectedTrabajo._id, this.selectedPersonal._id, this.selectedInstrumento._id);
    if (asig){
      swal({
        title: 'Hecho!',
        text: 'Asignación Realizada.',
        type: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30'
      })
    } else {
      swal({
        title: 'Error!',
        text: 'No se pudo realizar la asignación. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30'
      })
    }

  }

  confirmacion() {

    swal({
      title: 'Reset',
      text: "Ha regresado al primer paso.",
      type: 'info',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#3b3a30'
    })
  }


  setConf(b: boolean) {

    this.conf = b;
  }

  getConf(): boolean {
    return this.conf;
  }


  onSelectOrden(orden: Orden): void {

    this.selectedOrden = orden;
  }

  isOrdenSelected(orden: Orden) { return orden === this.selectedOrden; }

  ordenVacia() {
    return this.selectedOrden === null;
  }

  //TRABAJOS

  calcularTrabajos() {
    this._trabajosService.getTrabajosOrden(this.selectedOrden._id).then(trabajos => this.trabajos = trabajos);
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

  // INSTRUMENTO

  calcularInstrumentos() {
    this._instrumentoService.getInstrumentosTipoTrabajo(this.selectedTrabajo.tipoTrabajo.tiposInstrumentos).then(instrumentos => this.instrumentos = instrumentos);
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


  //Reset pasos

  resetStep1() {
    this.selectedTrabajo = null;
    this.selectedPersonal = null;
    this.selectedInstrumento = null;
    this.instrumentos = [];
    this.trabajos = [];
    this.conf = false;
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
