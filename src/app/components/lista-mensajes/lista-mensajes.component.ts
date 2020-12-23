import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { MensajesService } from 'src/app/services/mensajes.service';
import {Mensaje} from '../../intefaces/mensaje';
import Swal from 'sweetalert2';
import { SoporteService } from 'src/app/services/soporte.service';

@Component({
  selector: 'app-lista-mensajes',
  templateUrl: './lista-mensajes.component.html',
  styleUrls: ['./lista-mensajes.component.css']
})
export class ListaMensajesComponent implements OnInit {
  miMensaje: Mensaje[] = [];
  texto: string ;
  emisor: string ;
  correo: string;
  count: number;
  estado: boolean;
  mensajeNV: Mensaje[] = [];
  telefono: number;


  columnaTablaMensaje: string [] = [
    'emisor',
    'correo',
    'estado',
    'count'
  ];

  constructor(private mensajeService: MensajesService, private router: Router, private soporteService: SoporteService) { }

  ngOnInit(): void {
    this.tablaM();
  }
tablaM(){
  this.mensajeService.getMensajes().subscribe(
    data => {
      this.miMensaje = data;
    },
    err => err
  );
}

verMensajeNL(correo: string){

  this.mensajeService.getNoLeidos(correo).subscribe(
    mensaje => this.mensajeNV = mensaje
  );


}


actualizarEMensaje(correo: string){

  this.mensajeService.actualizarEstado(correo).subscribe(
  data => {
    console.log(data);
    if (data.toString()){
      location.href = 'tabla';
    }else{
      Swal.fire();
      Swal.update({icon: 'error', allowOutsideClick: false, text: 'No se pudo actualizar los mensajes'});
    }
  },
  err => console.log(err)
);
}

cerrarSesion(){
  this.router.navigateByUrl('/');
}

irAlChat(){
  this.router.navigateByUrl('/mensajes')
}

logOut(){
  this.soporteService.logOut();
  this.router.navigateByUrl('/logginS')
}

}
