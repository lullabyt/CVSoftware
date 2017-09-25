import { Injectable } from '@angular/core';
import { Personal } from './../classes/personal';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { VariablesGlobales } from '../utiles/variablesGlobales';


@Injectable()
export class PersonalService {

  private personalUrl = VariablesGlobales.BASE_API_URL + '/api/personal/';
  private personalLibreUrl = VariablesGlobales.BASE_API_URL + '/api/personal/libre';
  private personalOcupadoUrl = VariablesGlobales.BASE_API_URL + '/api/personal/ocupado';

  /*
    //antes de incluir base de datos

  private personal:Personal[] = [
          {cuil:"724722934",nombre:"Juan",apellido:"Perez",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"ocupado"},
          {cuil:"457462849",nombre:"Lucas",apellido:"Gonzalez",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"libre"},
          {cuil:"958747947",nombre:"Juan",apellido:"Gutierrez",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"ocupado"},
          {cuil:"182391023",nombre:"Manuel",apellido:"Fernandez",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"ocupado"},
          {cuil:"123123912",nombre:"Ricardo",apellido:"Fraccia",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"libre"}

  ];
  */
  private atributos: string[] = [
    "Cuil", "Nombre", "Apellido", "Telefonos", "Direccion", "Puesto", "Asignado"
  ];

  constructor(private http: Http) {
    console.log("SERVICIO LISTO");
  }

  getPersonal(): Promise<Personal[]> {

    return this.http.get(this.personalUrl)
      .toPromise()
      .then(response => response.json() as Personal[])
      .catch(this.handleError);

  }

  getPersonalLibre(): Promise<Personal[]> {
    return this.http.get(this.personalLibreUrl)
      .toPromise()
      .then(response => response.json() as Personal[])
      .catch(this.handleError);

  }
  getPersonalOcupado(): Promise<Personal[]> {
    return this.http.get(this.personalOcupadoUrl)
      .toPromise()
      .then(response => response.json() as Personal[])
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
