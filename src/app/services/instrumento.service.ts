import { Injectable } from '@angular/core';
import { Instrumento } from './../classes/instrumento';
import { TipoTrabajo } from './../classes/tipoTrabajo';

@Injectable()
export class InstrumentoService {

  private instrumentos: Instrumento[] = [
    { numeroInstrumento: "1", nombre: "instrumento1", estado: "Libre", disponibilidad: "Libre", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "819", nombre: "limpieza", descripcion: "Alguna descripción" } },
    { numeroInstrumento: "2", nombre: "instrumento2", estado: "Libre", disponibilidad: "Libre", fechaIngreso: "15/01/2015", tipoTrabajo: { id: "819", nombre: "limpieza", descripcion: "Alguna descripción" } },
    { numeroInstrumento: "3", nombre: "instrumento3", estado: "Roto", disponibilidad: "No disponible", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "817", nombre: "reparacion", descripcion: "Alguna descripción" } },
    { numeroInstrumento: "4", nombre: "instrumento4", estado: "En reparación", disponibilidad: "No disponible", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "817", nombre: "reparacion", descripcion: "Alguna descripción" } },
    { numeroInstrumento: "5", nombre: "instrumento5", estado: "Prestado", disponibilidad: "Ocupado", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "817", nombre: "reparacion", descripcion: "Alguna descripción" } },
    { numeroInstrumento: "6", nombre: "instrumento6", estado: "Libre", disponibilidad: "Libre", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "819", nombre: "limpieza", descripcion: "Alguna descripción" } },
    { numeroInstrumento: "7", nombre: "instrumento7", estado: "Libre", disponibilidad: "Ocupado", fechaIngreso: "15/01/2017", tipoTrabajo: { id: "817", nombre: "reparacion", descripcion: "Alguna descripción" } }




  ];

  private atributos: string[] = [
    "Número de Instrumento", "Nombre", "Estado", "Disponibilidad", "Fecha de Ingreso"
  ];

  constructor() {
    console.log("SERVICIO LISTO");
  }

  getInstrumentos() {
    return this.instrumentos;
  }


  getInstrumentoTipoTrabajo(idTipo: string) {
    return this.instrumentos.filter(ins => ins.tipoTrabajo.id === idTipo);
  }



  getAtributos() {
    return this.atributos;
  }
}
