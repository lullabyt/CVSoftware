import { Injectable } from '@angular/core';
import { Instrumento } from './../classes/instrumento';

import { Headers, Http } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { VariablesGlobales } from '../utiles/variablesGlobales';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class InstrumentoService {

  private instrumentosUrl = VariablesGlobales.BASE_API_URL + '/api/instrumentos';
  /*

    //antes de incluir base de datos

    private instrumentos: Instrumento[] = [
      { numeroInstrumento: "1", nombre: "instrumento1", estado: "Libre", disponibilidad: "Libre", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "819", nombre: "limpieza", descripcion: "Alguna descripción" } },
      { numeroInstrumento: "2", nombre: "instrumento2", estado: "Libre", disponibilidad: "Libre", fechaIngreso: "15/01/2015", tipoTrabajo: { id: "819", nombre: "limpieza", descripcion: "Alguna descripción" } },
      { numeroInstrumento: "3", nombre: "instrumento3", estado: "Roto", disponibilidad: "No disponible", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "817", nombre: "reparacion", descripcion: "Alguna descripción" } },
      { numeroInstrumento: "4", nombre: "instrumento4", estado: "En reparación", disponibilidad: "No disponible", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "817", nombre: "reparacion", descripcion: "Alguna descripción" } },
      { numeroInstrumento: "5", nombre: "instrumento5", estado: "Prestado", disponibilidad: "Ocupado", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "817", nombre: "reparacion", descripcion: "Alguna descripción" } },
      { numeroInstrumento: "6", nombre: "instrumento6", estado: "Libre", disponibilidad: "Libre", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "819", nombre: "limpieza", descripcion: "Alguna descripción" } },
      { numeroInstrumento: "7", nombre: "instrumento7", estado: "Libre", disponibilidad: "Ocupado", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "817", nombre: "reparacion", descripcion: "Alguna descripción" } }


    ];
  */
  private atributos: string[] = [
    "Número de Instrumento", "Nombre", "Estado", "Disponibilidad", "Fecha de Ingreso"
  ];

  constructor(private http: Http) {
    console.log("SERVICIO LISTO");
  }

  getInstrumentosTipoTrabajo(_idTipoTrabajo: string): Promise<Instrumento[]> {

    const url = `${this.instrumentosUrl}/${_idTipoTrabajo}`;
    //  var params = new HttpParams();
    //  var i = 1;
    //  for (var i = 0; i < tipoInstrumentos.length; i++) {
    //  for (let ins of tipoInstrumentos) {
    //    params = params.append('_id' + i, ins.toString());
    //    console.log(ins.toString())
    //    i++;
    //  }
    //  return this.http.get(this.instrumentosUrl, { params: params })

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Instrumento[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*

    getInstrumentoTipoTrabajo(idTipo: string) {
      return this.instrumentos.filter(ins => ins.tipoTrabajo.id === idTipo);
    }

  */

  getAtributos() {
    return this.atributos;
  }


}
