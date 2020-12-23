import { Component, OnInit } from '@angular/core';
import {SoporteService} from '../../services/soporte.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-loggin-soporte',
  templateUrl: './loggin-soporte.component.html',
  styleUrls: ['./loggin-soporte.component.css']
})
export class LogginSoporteComponent implements OnInit {

  public correo: string;
  public password: string;
  nombre: string;
  apellido: string;
  activo: boolean;
  isloggin = false;
  token: string;
  

  constructor(private servicio: SoporteService, private router: Router) { }

  ngOnInit(): void {
  }

  ingresar(){
    this.servicio.getSoporte(this.correo, this.password).subscribe(
      data => {
        console.log(data)
          if (data.toString().length > 5) {
            Swal.fire();
            Swal.update({icon: 'success', allowOutsideClick: false, text: 'ingresado como soporte'});
            this.router.navigateByUrl('/tabla');
          }else{
            Swal.fire();
            Swal.update({icon: 'error', allowOutsideClick: false, text: 'Usuario Invalido'});
          }
      },
      err => console.log(err)
    );
  }

  
}
