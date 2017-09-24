
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { VariablesGlobales } from '../utiles/variablesGlobales';
import 'rxjs/add/operator/toPromise';
import {Asignacion} from './../classes/asignacion';

@Injectable()
export class AsignacionService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private asignacionUrl = VariablesGlobales.BASE_API_URL+'/api/asignacion';


  constructor(private http: Http) {  }


  getAsignaciones(): Promise<Asignacion[]> {
    return this.http.get(this.asignacionUrl)
      .toPromise()
      .then(response => response.json() as Asignacion[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  createAsignacion(trabajo: string, personal: string, instrumento: string): Promise<Asignacion>{
    return this.http
    .post(this.asignacionUrl, JSON.stringify({trabajo:trabajo, personal:personal, instrumento:instrumento }), {headers: this.headers})
    .toPromise()
    .then(res =>{
        return res.json().obj;
    })
    .catch(this.handleError);
  }



}

/*

createContrato(nomb: string, fech: Date,tipo:string, numProy: String): Promise<Contrato> {
            console.log("ENTRE AL CREAR Contrato");
            console.log('el nombre del contrato es: '+nomb + " y el tipo " + tipo);

            return this.http
            .post(this.contratosURL, JSON.stringify({ nombre: nomb, fecha:fech, tipo:tipo, proyecto:numProy}), {headers: this.headers})
            .toPromise()
            .then(res =>{
                return res.json().obj;
            })
            .catch(this.handleError);
}

*/
