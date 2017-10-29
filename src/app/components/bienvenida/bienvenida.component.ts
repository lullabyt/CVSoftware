import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  private selectedDateFrom: Date;
  private selectedDateTo: Date;

  constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('es-ES');
  }

  ngOnInit() {

  }


  ver() {
    console.log(this.selectedDateFrom);
    console.log(this.selectedDateTo);
    console.log(this.selectedDateFrom.getDate());
    console.log(this.selectedDateFrom.getDay());
    console.log(this.selectedDateFrom.valueOf());
    console.log(this.selectedDateFrom.toLocaleDateString());
    console.log(this.selectedDateFrom.toDateString());
    console.log(this.selectedDateFrom.toString());

  }


}
