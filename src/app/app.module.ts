import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material imports
import {
  MatAutocompleteModule,
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
} from '@angular/material';


//Servicios

import { OrdenesService } from './services/ordenes.service';
import { TrabajosService } from './services/trabajos.service';
import { PersonalService } from './services/personal.service';
import { InstrumentoService } from './services/instrumento.service';
import { AsignacionService } from './services/asignacion.service';

import { AsignarPersonalService } from './services/asignarPersonal.service';
import { TipoPiezaInspeccionadaService } from './services/tipoPiezaInspeccionada.service';
import { TrabajosSupervisadosEmpleadoService } from './services/trabajosSupervisadosEmpleado.service';

import { DateFormatPipe } from './utiles/convertidorFechas';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { PageNotFoundComponent } from './not-found.component';

import { WizardModule } from 'ng2-archwizard';
import { WizardAsignarPersonalComponent } from './components/wizardAsignarPersonal/wizard.component';
import { WizardTipoPiezaInspeccionadaComponent } from './components/wizardTipoPiezaInspeccionada/wizard.component';
import { WizardTrabajosSupervisadosEmpleadoComponent } from './components/wizardTrabajosSupervisadosEmpleado/wizard.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';


// material module
@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
  ]
})
export class MaterialModule { }



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BienvenidaComponent,
    WizardAsignarPersonalComponent,
    WizardTipoPiezaInspeccionadaComponent,
    WizardTrabajosSupervisadosEmpleadoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    WizardModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    OrdenesService,
    TrabajosService,
    PersonalService,
    InstrumentoService,
    AsignacionService,
    AsignarPersonalService,
    TipoPiezaInspeccionadaService,
    TrabajosSupervisadosEmpleadoService,
    DateFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
