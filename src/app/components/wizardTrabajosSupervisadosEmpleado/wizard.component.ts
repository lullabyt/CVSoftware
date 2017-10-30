import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { DateFormatPipe } from '../../utiles/convertidorFechas';

//servicios
import { TrabajosSupervisadosEmpleadoService } from '../../services/trabajosSupervisadosEmpleado.service';


//clases
import { Personal } from '../../classes/personal';
import { Trabajo } from '../../classes/trabajo';

//sweet alert
declare var swal: any;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})


export class WizardTrabajosSupervisadosEmpleadoComponent implements OnInit {

  selectedDateFrom: Date = null;
  selectedDateTo: Date = null;

  selectedPersonal: Personal = null;
  private personal: Personal[] = [];
  private atributosPersonal: string[] = [];

  selectedTrabajo: Trabajo = null;
  private trabajos: Trabajo[] = [];
  private atributosTrabajo: string[] = [];


  constructor(
    private _trabajosSupervisadosEmpleadoService: TrabajosSupervisadosEmpleadoService,

    private dateFormatPipe: DateFormatPipe,
    private dateAdapter: DateAdapter<NativeDateAdapter>
  ) {
    dateAdapter.setLocale('es-ES');
  }


  ngOnInit() {

    //obtenemos nombres de columnas de las tablas
    this.atributosPersonal = this._trabajosSupervisadosEmpleadoService.getAtributosPersonal();
    this.atributosTrabajo = this._trabajosSupervisadosEmpleadoService.getAtributosTrabajo();

    //se obtiene personal
    this.getPersonal();

  }


  // mensajes para el usuario en formato sweet alert

  consultaRealizada() {

    try {

      //se obtienen los trabajos resultantes de la consulta
      this.calcularTrabajos();

      swal({
        title: 'Hecho!',
        text: 'Consulta Realizada con éxito.',
        type: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      })

    } catch (err) {

      swal({
        title: 'Error!',
        text: 'No se pudo realizar la consulta. Pruebe más tarde.',
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

    this._trabajosSupervisadosEmpleadoService.getPersonalLibre().then(personal => {
      var libres: Personal[];

      libres = personal;
      for (let personal of libres) {
        personal.asignado = 'Libre';
      };

      this._trabajosSupervisadosEmpleadoService.getPersonalOcupado().then(personal => {
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


  //PERIODO FECHA

  fechaCompletada() {
    return (this.selectedDateFrom !== null && this.selectedDateTo !== null);
  }



  //TRABAJOS


  //se obtienen los trabajos resultantes de la consulta
  calcularTrabajos() {

    //var fechaIni = this.selectedDateTo.toLocaleDateString();
    //var fechaFin = this.selectedDateFrom.toLocaleDateString();
    let fechaIni = this.dateFormatPipe.transform(this.selectedDateFrom);
    let fechaFin = this.dateFormatPipe.transform(this.selectedDateTo);


    this._trabajosSupervisadosEmpleadoService.getTrabajosSupervisadosEmpleado(this.selectedPersonal._id, fechaIni, fechaFin)
      .then(trabajos => this.trabajos = trabajos);

  }


  onSelectTrabajo(trabajo: Trabajo): void {
    this.selectedTrabajo = trabajo;
  }

  isTrabajoSelected(trabajo: Trabajo) { return trabajo === this.selectedTrabajo; }

  trabajoVacia() {
    return this.selectedTrabajo === null;
  }



  //Reset pasos del wizard
  //de manera que no quede informacion desactualizada al volver a pasos anteriores

  resetStep1() {
    this.selectedDateFrom = null;
    this.selectedDateTo = null;
  }


}
