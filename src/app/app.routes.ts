import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContatoComponent } from './pages/cadastro-contato/cadastro-contato.component';
import { ConsultaContatoComponent } from './pages/consulta-contato/consulta-contato.component';
import { authGuard } from './core/guards/auth.guard'; 

export const routes: Routes = [
  { path: 'cadastro', component: CadastroContatoComponent, canActivate: [authGuard] },
  { path: 'consulta', component: ConsultaContatoComponent },
  { path: '', redirectTo: '/consulta', pathMatch: 'full' },
  { path: '**', redirectTo: '/consulta' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

