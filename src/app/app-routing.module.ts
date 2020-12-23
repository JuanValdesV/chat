import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaMensajesComponent } from './components/lista-mensajes/lista-mensajes.component';
import { LogginSoporteComponent } from './components/loggin-soporte/loggin-soporte.component';
import { SoporteGuardGuard } from './guards/soporte-guard.guard';
import { UsuarioGuardService } from './guards/usuario-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'mensajes', component: MensajesComponent,
    canActivate: [UsuarioGuardService]
  },
  {path: '*', component: LoginComponent},
  {path: 'logginS', component: LogginSoporteComponent},
  {path: 'tabla', component: ListaMensajesComponent,
  canActivate:[SoporteGuardGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
