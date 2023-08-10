import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProcessamentoComponent } from './views/processamento/processamento.component';
import { UsuarioNaoAutenticadoGuard } from './shared/services/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './shared/services/guards/usuario-autenticado.guard';
import { UsuarioAdministradorGuard } from './shared/services/guards/usuario-administrador.guard';
import { GestaoUsuarioComponent } from './views/gestao-usuario/gestao-usuario.component';


const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    canActivate: [UsuarioNaoAutenticadoGuard]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [UsuarioAutenticadoGuard]
  },
  {
    path:'processamento',
    component: ProcessamentoComponent,
    canActivate: [UsuarioAutenticadoGuard]
  },
  {
    path:'gestao-usuario',
    component: GestaoUsuarioComponent,
    canActivate: [UsuarioAutenticadoGuard, UsuarioAdministradorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
