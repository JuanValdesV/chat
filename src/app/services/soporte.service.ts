import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Soporte} from '../intefaces/soporte';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoporteService {
  token: string;

  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {headers : new HttpHeaders({'Content-Type': 'application/json'})};


  private URL: string = ('http://localhost:5000/soporte');
  private Crear: string = ('/crear');
  private loggin: string = ('/loggin');

  crearSoporte(soporte: Soporte){
    return this.http.post(`${this.URL + this.Crear}`, soporte, this.httpOptions);
  }

  getSoporte(correo: string, password: string ){
    const pass = {
      'password': password
    };
    
    return this.http.post(`${this.URL + this.loggin}/${correo}`, pass, this.httpOptions).
    pipe(
      
      map(resp=>{
        this.guardarToken(resp['token'])
        return resp;
      })
    )
      
  }



  getToken(){
    return localStorage.getItem('token');
  }
   guardarToken(token: string){
    this.token = token;
    localStorage.setItem('token', token);

  }
   leerToken(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
    }else{
      this.token = '';
    }
    return this.token;
  }

  validarToken(): boolean{
    return this.token.length > 1;
  }

  logOut(){
    localStorage.removeItem('token');
  }


}
