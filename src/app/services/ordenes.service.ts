import { Injectable } from '@angular/core';
import { Orden } from './../classes/orden';

import { Headers, Http } from '@angular/http';
import { VariablesGlobales } from '../utiles/variablesGlobales';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrdenesService {


  private ordenesUrl = VariablesGlobales.BASE_API_URL + '/api/ordenes';  // URL to web api


  //antes de incluir base de datos

  //private ordenes:Orden[] = [
  //      {numeroOrden:'5',fechaIngreso:'12/5/2017',progreso:"En curso",observaciones:"Alguna observación importante"},
  //      {numeroOrden:'14',fechaIngreso:'3/02/2016',progreso:"En curso",observaciones:"Alguna observación importante"},
  //      {numeroOrden:'35',fechaIngreso:'9/07/2016',progreso:"En curso",observaciones:"Alguna observación importante"},
  //      {numeroOrden:'6',fechaIngreso:'3/09/2016',progreso:"En curso",observaciones:"Alguna observación importante"},
  //      {numeroOrden:'22',fechaIngreso:'6/02/2016',progreso:"En curso",observaciones:"Alguna observación importante"},
  //      {numeroOrden:'52',fechaIngreso:'10/06/2016',progreso:"En curso",observaciones:"Alguna observación importante"}

  //];

  private atributos: string[] = [
    "Número de Orden", "Fecha de Ingreso", "Progreso", "Observaciones"
  ];

  constructor(private http: Http) {

    console.log("SERVICIO LISTO");
  }

  // getOrdenes(){
  //   return this.ordenes;
  //}

  getOrdenes(): Promise<Orden[]> {
    return this.http.get(this.ordenesUrl)
      .toPromise()
      .then(response => response.json() as Orden[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAtributos() {
    return this.atributos;
  }
}
