import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Mensaje} from '../intefaces/mensaje';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private http:HttpClient) { }

  httpOptions = {headers : new HttpHeaders({'Content-Type': 'application/json'})};


  private URL: string = ('http://localhost:5000/mensajes');
  private crear: string = ('/crearMensaje');
  private tabla: string = ('/tabla');
  private actualizar: string = ('/mensajes');
  private noLeidos: string = ('/mensajesnv');


  crearMensaje(mensaje: Mensaje){
    return this.http.post(`${this.URL + this.crear}`, mensaje, this.httpOptions);
  }

  getMensajes():Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(`${this.URL + this.tabla}`);
  }

  actualizarEstado(correo: string){
    return this.http.put(`${this.URL + this.actualizar}/${correo}`, this.httpOptions)
  }

  getNoLeidos(correo: string):Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(`${this.URL + this.noLeidos}/${correo}`);
  }
}
