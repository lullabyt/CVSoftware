import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { PageNotFoundComponent } from './not-found.component';

import { WizardAsignarPersonalComponent } from './components/wizardAsignarPersonal/wizard.component';
import { WizardTipoPiezaInspeccionadaComponent } from './components/wizardTipoPiezaInspeccionada/wizard.component';
import { WizardTrabajosSupervisadosEmpleadoComponent } from './components/wizardTrabajosSupervisadosEmpleado/wizard.component';
import {DatepickerComponent} from './components/shared/datepicker/datepicker.component';


const routes: Routes = [

  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'wizardAsignarPersonal', component: WizardAsignarPersonalComponent },
  { path: 'wizardTipoPiezaInspeccionada', component: WizardTipoPiezaInspeccionadaComponent },
  { path: 'wizardTrabajosSupervisadosEmpleado', component: WizardTrabajosSupervisadosEmpleadoComponent },
  { path: 'datepicker', component: DatepickerComponent },


  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
