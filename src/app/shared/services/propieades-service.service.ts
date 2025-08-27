import { Injectable } from '@angular/core';
import { Propiedad } from '../models/propiedad.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {
  propiedades: Propiedad[] = [];

  private propiedadesSubject = new BehaviorSubject<Propiedad[]>(this.propiedades);
  propiedades$ = this.propiedadesSubject.asObservable();


  obtenerPropiedadPorId(id: string) {
    return this.propiedades.find(p => p.id === id);
  } 

  obtenerTodas() {
    return this.propiedades;
  }
}
