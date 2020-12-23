import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SoporteService } from '../services/soporte.service';

@Injectable({
  providedIn: 'root'
})
export class SoporteGuardGuard implements CanActivate {

  isloggin = false;
  correo: string;
  password: string;

  constructor(private servicioSoporte: SoporteService , private router: Router){

  }
  canActivate(): boolean{
    if (this.servicioSoporte.validarToken()){
      return true;
    }else{
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
