import { Injectable } from '@angular/core';
import { Orden } from './../classes/orden';

@Injectable()
export class OrdenesService {

private ordenes:Orden[] = [
        {numeroOrden:'5',fechaIngreso:'12/5/2017',progreso:"En curso",observaciones:"Alguna observación importante"},
        {numeroOrden:'14',fechaIngreso:'3/02/2016',progreso:"En curso",observaciones:"Alguna observación importante"},
        {numeroOrden:'35',fechaIngreso:'9/07/2016',progreso:"En curso",observaciones:"Alguna observación importante"},
        {numeroOrden:'6',fechaIngreso:'3/09/2016',progreso:"En curso",observaciones:"Alguna observación importante"},
        {numeroOrden:'22',fechaIngreso:'6/02/2016',progreso:"En curso",observaciones:"Alguna observación importante"},
        {numeroOrden:'52',fechaIngreso:'10/06/2016',progreso:"En curso",observaciones:"Alguna observación importante"}

];

private atributos:string[] = [
        "Número de Orden","Fecha de Ingreso","Progreso","Observaciones"
];

  constructor() {
        console.log("SERVICIO LISTO");
   }

   getOrdenes(){
     return this.ordenes;
   }

   getAtributos(){
     return this.atributos;
   }
}
