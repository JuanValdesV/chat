import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Mensaje } from 'src/app/intefaces/mensaje';
import { ChatService } from 'src/app/services/chat.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { SoporteService } from 'src/app/services/soporte.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import Swal from 'sweetalert2';
import {Soporte} from '../../intefaces/soporte';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string;
  receptor: Observable<any>;
  emisor: string;
  correo: string;
  miMensaje: Mensaje[] = [];

  mensajesSubscription: Subscription;

  mensajes: any[] = [];
  miSoporte: Soporte [] = [];

  elemento: HTMLElement;

  constructor(public chatService: ChatService, public wsService: WebsocketService, public mensajeService: MensajesService, private soporteService: SoporteService) { }

  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes');
    this.mensajesSubscription = this.chatService.getMessages().subscribe(msg => {
    this.mensajes.push(msg); setTimeout(() => {
    this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }
  ngOnDestroy(){
    this.mensajesSubscription.unsubscribe();
  }

  enviar(){
    if (this.texto.trim().length === 0){
      return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

  salir(){
    this.wsService.logoutWS();
  }

  crearM(){
    console.log('para:' + this.wsService.getUsuario().correo);
    const newMensaje: Mensaje = {
      texto: this.texto,
      emisor: this.wsService.getUsuario().nombre,
      correo : this.wsService.getUsuario().correo
    };
    this.mensajeService.crearMensaje(newMensaje).subscribe(
      res => {
      },
      err => {
        Swal.fire();
        Swal.update({allowOutsideClick : false, text: 'No se pueden mandar mensajes vacíos', icon: 'error'});
        console.log(err);
      }
    );
  }

  /*datosSoporte(){
    this.soporteService.datosSoporte().subscribe(
      soporte => this.miSoporte = soporte
    ),
    err => console.log(err);
  }*/

}
