import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { DateFormatPipe } from '../../utiles/convertidorFechas';
//servicios
import { TipoPiezaInspeccionadaService } from '../../services/tipoPiezaInspeccionada.service';

import { TipoPieza } from '../../classes/tipoPieza';

declare var swal: any;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})


export class WizardTipoPiezaInspeccionadaComponent implements OnInit {

  private selectedDateFrom: Date = null;
  private selectedDateTo: Date = null;
  private tipoPieza:TipoPieza = null;
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
    console.log("LLAMANDO AL SERVICE");
    var resultado: any;
    let fechaIni = this.dateFormatPipe.transform(this.selectedDateFrom);
    let fechaFin = this.dateFormatPipe.transform(this.selectedDateTo);
    this._tipoPiezaInspeccionadaService.getTipoPiezaIns(fechaIni,fechaFin).then(resultado => {
      this.tipoPieza = resultado.tipoPieza;
      this.cantidad = resultado.cantidad;
    });

  }

  cantidadVacia(){
    return this.cantidad === null;
  }


}
