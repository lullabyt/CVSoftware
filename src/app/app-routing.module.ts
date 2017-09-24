import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BienvenidaComponent }   from './components/bienvenida/bienvenida.component';
//import { HeroesComponent }      from './heroes.component';
//import { HeroDetailComponent }  from './hero-detail.component';
//import { CrisisComponent }   from './crisis.component';
import { PageNotFoundComponent }   from './not-found.component';
import {WizardComponent} from './components/wizard/wizard.component';


const routes: Routes = [
//  { path: 'crisis-center', component: CrisisComponent },
  { path: 'bienvenida',  component: BienvenidaComponent },
  { path: 'wizard',  component: WizardComponent },

  //{ path: 'detail/:id', component: HeroDetailComponent },
  //{ path: 'heroes',     component: HeroesComponent },
  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
