import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlBase = "https://api.escuelajs.co/api/v1/users";

  constructor(private clienteHttp:HttpClient) { }

  obtenerUsuario():Observable<Usuario[]> {
    return this.clienteHttp.get<Usuario[]>(this.urlBase);
  }
}
