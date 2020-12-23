import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from 'src/app/intefaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  httpOptions = {headers : new HttpHeaders({'Content-Type': 'application/json'})};

  private URL: string = ('http://localhost:5000/usu');

  private crearUsuarioUrl: string = ('/crearUsu');
  private listarUsuarioUrl: string = ('/listar');

  crear(usuario: Usuario){

    return this.http.post(`${this.URL + this.crearUsuarioUrl}`, usuario, this.httpOptions);

  }

  listar(){
    return this.http.get<Usuario[]>(`${this.URL + this.listarUsuarioUrl}`);
  }

}
