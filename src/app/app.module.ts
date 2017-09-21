import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Servicios

import { OrdenesService} from './services/ordenes.service';
import { TrabajosService} from './services/trabajos.service';
import { PersonalService} from './services/personal.service';
import {InstrumentoService} from './services/instrumento.service';
import {AsignacionService} from './services/asignacion.service';




import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';

import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { PageNotFoundComponent }   from './not-found.component';

import { WizardModule } from 'ng2-archwizard';
import { WizardComponent } from './components/wizard/wizard.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { OrdenesComponent } from './components/ordenes/ordenes.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BienvenidaComponent,
    WizardComponent,
    NavbarComponent,
    OrdenesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    WizardModule
  ],
  providers:[
    OrdenesService,
    TrabajosService,
    PersonalService,
    InstrumentoService,
    AsignacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
