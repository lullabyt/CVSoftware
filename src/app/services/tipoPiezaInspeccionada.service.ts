
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { VariablesGlobales } from '../utiles/variablesGlobales';
import 'rxjs/add/operator/toPromise';


//clases utilizadas
import { Asignacion } from './../classes/asignacion';
import { Instrumento } from './../classes/instrumento';
import { Orden } from './../classes/orden';
import { Personal } from './../classes/personal';
import { Trabajo } from './../classes/trabajo';


//MOVIMIENTO TIPO PIEZA MAS INSPECCIONADA

@Injectable()
export class TipoPiezaInspeccionadaService {

  private headers = new Headers({ 'Content-Type': 'application/json' });


  //urls hacia movimiento tipoPiezaInspeccionada
  private tipoPiezaUrl = VariablesGlobales.BASE_API_URL + '/movimiento/tipoPiezaInspeccionada';


  constructor(private http: Http) { }




  getTipoPiezaIns(fechaInicio: string, fechaFin: string): Promise<any> {
    console.log("ENTRO AL SERVICE")
      var config = {
        params: {
          fechaIni: fechaInicio,
          fechaFin: fechaFin
        }
      };

      return this.http
        .get(this.tipoPiezaUrl, config)
        .toPromise()
        .then(response => response.json().obj)
        .catch(this.handleError);

  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
