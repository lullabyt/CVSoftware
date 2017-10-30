import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
//servicios
import { TipoPiezaInspeccionadaService } from '../../services/tipoPiezaInspeccionada.service';

import { TipoPieza } from '../../classes/tipoPieza';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})


export class WizardTipoPiezaInspeccionadaComponent implements OnInit {

  private selectedDateFrom: Date = null;
  private selectedDateTo: Date = null;
  private tipoPieza:TipoPieza = null;
  private cantidad: Number;


  constructor(dateAdapter: DateAdapter<NativeDateAdapter>,
              private _tipoPiezaInspeccionadaService: TipoPiezaInspeccionadaService) {
              dateAdapter.setLocale('es-ES');
  }

  ngOnInit() {

  }

  fechasVacias() {
    return (this.selectedDateFrom === null || this.selectedDateTo ===null );
  }

  consultarPieza(){
    console.log("LLAMANDO AL SERVICE");
    this._tipoPiezaInspeccionadaService.getTipoPiezaIns(this.selectedDateFrom.toLocaleDateString(),this.selectedDateTo.toLocaleDateString());
    //acomodar el resultado
  }

  tipoVacio(){
    return this.tipoPieza === null; 
  }


}
