import { Component, OnInit } from '@angular/core';
import { AsignacionService } from '../../services/asignacion.service';
import { Asignacion } from '../../classes/asignacion';

declare var swal: any;

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  constructor(     private _asignacionService: AsignacionService
) { }

  ngOnInit() {

  }

  hacerpost(){
    var asig = this._asignacionService.createAsignacion('59c0432c5cfbfe3cb64ac1c4', '59bfd4d73c1b8b0c56ca4f7f', '59c12d139af82a739275becc');
    if (asig){
      swal({
        title: 'Hecho!',
        text: 'Asignación Realizada.',
        type: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30'
      })
    } else {
      swal({
        title: 'Error!',
        text: 'No se pudo realizar la asignación. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30'
      })
    }

  }

}
