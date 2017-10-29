import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



//Servicios

import { OrdenesService } from './services/ordenes.service';
import { TrabajosService } from './services/trabajos.service';
import { PersonalService } from './services/personal.service';
import { InstrumentoService } from './services/instrumento.service';
import { AsignacionService } from './services/asignacion.service';

import { AsignarPersonalService } from './services/asignarPersonal.service';
import { TipoPiezaInspeccionadaService } from './services/tipoPiezaInspeccionada.service';
import { TrabajosSupervisadosEmpleadoService } from './services/trabajosSupervisadosEmpleado.service';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { PageNotFoundComponent } from './not-found.component';

import { WizardModule } from 'ng2-archwizard';
import { WizardAsignarPersonalComponent } from './components/wizardAsignarPersonal/wizard.component';
import { WizardTipoPiezaInspeccionadaComponent } from './components/wizardTipoPiezaInspeccionada/wizard.component';
import { WizardTrabajosSupervisadosEmpleadoComponent } from './components/wizardTrabajosSupervisadosEmpleado/wizard.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { DatepickerComponent } from './components/shared/datepicker/datepicker.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BienvenidaComponent,
    WizardAsignarPersonalComponent,
    WizardTipoPiezaInspeccionadaComponent,
    WizardTrabajosSupervisadosEmpleadoComponent,
    NavbarComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    WizardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule

  ],
  providers: [
    OrdenesService,
    TrabajosService,
    PersonalService,
    InstrumentoService,
    AsignacionService,
    AsignarPersonalService,
    TipoPiezaInspeccionadaService,
    TrabajosSupervisadosEmpleadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
