import { Injectable } from '@angular/core';
import { Personal } from './../classes/personal';

@Injectable()
export class PersonalService {

private personal:Personal[] = [
        {cuil:"724722934",nombre:"Juan",apellido:"Perez",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"ocupado"},
        {cuil:"457462849",nombre:"Lucas",apellido:"Gonzalez",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"libre"},
        {cuil:"958747947",nombre:"Juan",apellido:"Gutierrez",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"ocupado"},
        {cuil:"182391023",nombre:"Manuel",apellido:"Fernandez",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"ocupado"},
        {cuil:"123123912",nombre:"Ricardo",apellido:"Fraccia",telefonos:"15789684",direccion:"una dire",puesto:"Operador",asignado:"libre"}

];

private atributos:string[] = [
  "Cuil","Nombre","Apellido","Telefonos","Direccion","Puesto","Asignado"
];

  constructor() {
        console.log("SERVICIO LISTO");
   }

   getPersonal(){
     return this.personal;
   }

   getAtributos(){
     return this.atributos;
   }
}
