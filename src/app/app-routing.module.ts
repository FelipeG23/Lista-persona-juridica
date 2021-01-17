
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEvaluacionesComponent } from './component/lista-evaluaciones/lista-evaluaciones.component';
import { CambiocontraseniaComponent } from './component/logeado/cambiocontrasenia/cambiocontrasenia.component';

const routes: Routes = [
  {
    path: '',
    component: CambiocontraseniaComponent
  },
  {
    path: 'listaEvaluaciones/:id',
    component: ListaEvaluacionesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
