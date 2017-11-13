import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { DateFormatPipe } from '../../utiles/convertidorFechas';
//servicios
import { TipoPiezaInspeccionadaService } from '../../services/tipoPiezaInspeccionada.service';

import { TipoPieza } from '../../classes/tipoPieza';
import swal from 'sweetalert2';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})


export class WizardTipoPiezaInspeccionadaComponent implements OnInit {

  private selectedDateFrom: Date = null;
  private selectedDateTo: Date = null;
  private nombreTipoPieza:String = null;
  private descripcion: String = null;
  private cantidad: Number = null;


  constructor(dateAdapter: DateAdapter<NativeDateAdapter>,
              private _tipoPiezaInspeccionadaService: TipoPiezaInspeccionadaService,
              private dateFormatPipe: DateFormatPipe
    ) {
              dateAdapter.setLocale('es-ES');
  }

  ngOnInit() {

  }

  volver() {

    swal({
      title: 'Reset',
      text: "Ha regresado al inicio",
      type: 'info',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#3b3a30',
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }

  fechasVacias() {
    return (this.selectedDateFrom === null || this.selectedDateTo ===null );
  }

  consultarPieza(){
    var resultado: any;
    let fechaIni = this.dateFormatPipe.transform(this.selectedDateFrom);
    let fechaFin = this.dateFormatPipe.transform(this.selectedDateTo);
    this._tipoPiezaInspeccionadaService.getTipoPiezaIns(fechaIni,fechaFin).then(resultado => {
      console.log(resultado);
      if(resultado!==null){
        swal({
          title: 'Hecho!',
          text: 'Consulta realizada con éxito.',
          type: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3b3a30',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        this.nombreTipoPieza = resultado.nombre;
        this.descripcion = resultado.descripcion;
        this.cantidad = resultado.cantidad;
      } else {
        swal({
          title: 'Sin resultados!',
          text: 'No existen tipo de piezas inspeccionadas',
          type: 'warning',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3b3a30',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }

    });

  }

  cantidadVacia(){
    return this.cantidad === null;
  }


}
