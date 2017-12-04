
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { VariablesGlobales } from '../utiles/variablesGlobales';
import 'rxjs/add/operator/toPromise';


//clases utilizadas
import { Asignacion } from './../classes/asignacion';
import { Personal } from './../classes/personal';
import { Trabajo } from './../classes/trabajo';


//MOVIMIENTO TRABAJOS SUPERVISADOS EMPLEADO

@Injectable()
export class TrabajosSupervisadosEmpleadoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });


  //urls hacia movimiento trabajosSupervisadosEmpleado
  private asignacionUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/trabajosSupervisadosEmpleado/obtenerTrabajosSupervisadosEmpleado';
  private personalUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/trabajosSupervisadosEmpleado/obtenerPersonal';


  private atributosTrabajo: string[] = [
    "Número de Trabajo", "Fecha de Realizaciín", "Evaluación", "Observacion", "Orden de Servicio", "Tipo de Trabajo"
  ];

  private atributosPersonal: string[] = [
    "Cuil", "Nombre", "Apellido", "Telefonos", "Direccion", "Puesto", "Asignado"
  ];


  constructor(private http: Http) { }


  getPersonalLibre(): Promise<Personal[]> {

    const urlLibre = this.personalUrl + 'Libre';

    return this.http.get(urlLibre)
      .toPromise()
      .then(response => response.json() as Personal[])
      .catch(this.handleError);
  }


  getPersonalOcupado(): Promise<Personal[]> {

    const urlOcupado = this.personalUrl + 'Ocupado';

    return this.http.get(urlOcupado)
      .toPromise()
      .then(response => response.json() as Personal[])
      .catch(this.handleError);
  }


  getTrabajosSupervisadosEmpleado(empleado: string, fechaIni: string, fechaFin: string): Promise<Trabajo[]> {

    //configuracion de parametros para http get
    var config = {
      params: {
        empleado: empleado,
        fechaIni: fechaIni,
        fechaFin: fechaFin
      }
    };

    return this.http
      .get(this.asignacionUrl, config)
      .toPromise()
      .then(response => response.json() as Trabajo[])
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



  getAtributosPersonal() {
    return this.atributosPersonal;
  }

  getAtributosTrabajo() {
    return this.atributosTrabajo;
  }


}
