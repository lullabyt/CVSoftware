
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { VariablesGlobales } from '../utiles/variablesGlobales';
import 'rxjs/add/operator/toPromise';
import { Asignacion } from './../classes/asignacion';

@Injectable()
export class AsignacionService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private asignacionUrl = VariablesGlobales.BASE_API_URL + '/api/asignaciones';


  constructor(private http: Http) { }


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


  createAsignacion(trabajo: string, personal: string, instrumento: string): Promise<Asignacion> {
    const url = this.asignacionUrl + '/post';

    return this.http
      .post(url, JSON.stringify({ trabajo: trabajo, personal: personal, instrumento: instrumento }), { headers: this.headers })
      .toPromise()
      .then(res => {
        return res.json().obj;
      })
      .catch(this.handleError);
  }


}
