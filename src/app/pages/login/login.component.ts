import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';
import {Usuario} from 'src/app/intefaces/usuario';
import {UsuarioService} from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre: string;
  apellido: string;
  correo: string;
  telefono: number;

  miUsuario: Usuario[] = [];
  columnaTabla: string[] = [
    'nombre',
    'apellido',
    'correo',
    'telefono'
  ];


  constructor(public wsService: WebsocketService, private router:Router, private servicio:UsuarioService) { }

  ngOnInit(): void {
    this.servicio.listar().subscribe(data => {this.miUsuario = data; });
  }

  ingresar(){
    this.wsService.loginWS(this.nombre, this.correo)
    .then( () => {
    });
  }

  crearUsu(){

    const newUsu: Usuario= {
      nombre:  this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      telefono: this.telefono
    };
    this.servicio.crear(newUsu).subscribe(
      data => {
        Swal.fire();
        Swal.update({icon: 'success', allowOutsideClick: false, text: 'Usuario Guardado'});
        this.router.navigateByUrl('/mensajes');
      },
      err => {
        Swal.fire();
        Swal.update({icon: 'error', allowOutsideClick: false, text: 'Usuario no creado'});
        console.log(err);
      }
    );

  }




}
