import { Injectable } from '@angular/core';
import { Trabajo } from './../classes/trabajo';

@Injectable()
export class TrabajosService {

  private trabajos: Trabajo[] = [
    { numeroTrabajo: '5', fechaRealizacion: '12/5/2017', evaluacion: "Prioritario", observacion: "Alguna observación", ordenServicio: { numeroOrden: '5', fechaIngreso: '12/5/2017', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "614", nombre: "Reparación", descripcion: "Reparar manijas" } },
    { numeroTrabajo: '14', fechaRealizacion: '3/02/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '5', fechaIngreso: '12/5/2017', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "817", nombre: "Reparación", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '35', fechaRealizacion: '9/07/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '5', fechaIngreso: '12/5/2017', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "819", nombre: "Limpieza", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '6', fechaRealizacion: '3/09/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '22', fechaIngreso: '6/02/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "817", nombre: "Reparacion", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '22', fechaRealizacion: '6/02/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '5', fechaIngreso: '12/5/2017', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "819", nombre: "Limpieza", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '52', fechaRealizacion: '10/06/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '22', fechaIngreso: '6/02/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "817", nombre: "Reparación", descripcion: "Alguna descripción" } },

    { numeroTrabajo: '12', fechaRealizacion: '10/07/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '14', fechaIngreso: '3/02/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "817", nombre: "Reparación", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '13', fechaRealizacion: '12/08/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '14', fechaIngreso: '3/02/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "1006", nombre: "Reparación", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '20', fechaRealizacion: '13/09/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '14', fechaIngreso: '3/02/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "819", nombre: "Limpieza", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '19', fechaRealizacion: '14/10/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '35', fechaIngreso: '9/07/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "819", nombre: "Limpieza", descripcion: "Alguna descripción" } },

    { numeroTrabajo: '40', fechaRealizacion: '15/05/2017', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '6', fechaIngreso: '3/09/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "817", nombre: "Reparación", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '41', fechaRealizacion: '16/06/2017', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '52', fechaIngreso: '10/06/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "415", nombre: "Limpieza", descripcion: "Alguna descripción" } },

    { numeroTrabajo: '42', fechaRealizacion: '01/07/2016', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '52', fechaIngreso: '10/06/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "817", nombre: "Reparación", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '43', fechaRealizacion: '01/08/2017', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '6', fechaIngreso: '3/09/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "764", nombre: "Limpieza", descripcion: "Alguna descripción" } },
    { numeroTrabajo: '44', fechaRealizacion: '02/09/2017', evaluacion: "Alguna evaluación", observacion: "Alguna observación", ordenServicio: { numeroOrden: '6', fechaIngreso: '3/09/2016', progreso: "En curso", observaciones: "Alguna observación importante" }, tipoTrabajo: { id: "819", nombre: "Limpieza", descripcion: "Alguna descripción" } }

  ];

  private atributos: string[] = [
    "Número de Trabajo", "Fecha de Realizaciín", "Evaluación", "Observacion", "Orden de Servicio", "Tipo de Trabajo"
  ];

  constructor() {
    console.log("SERVICIO LISTO");
  }

  getTrabajos(): Trabajo[] {
    return this.trabajos;
  }

  getTrabajosOrden(idOrden: string) {
    return this.trabajos.filter(trabajo => trabajo.ordenServicio.numeroOrden === idOrden);
  }

  getAtributos() {
    return this.atributos;
  }
}
