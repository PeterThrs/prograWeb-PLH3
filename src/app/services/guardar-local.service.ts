import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class GuardarLocalService {

  constructor() {}

  saveList(key: string, list: Pelicula[]): void {
    localStorage.setItem(key, JSON.stringify(list));
  }

  getList(key: string): Pelicula[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  removeList(key: string): void {
    localStorage.removeItem(key);
  }

}
