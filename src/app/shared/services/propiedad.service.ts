import { Injectable } from '@angular/core';
import { Propiedad } from '../models/propiedad.model';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private propiedades: Propiedad[] = [];
  private propiedadesSubject = new BehaviorSubject<Propiedad[]>(this.propiedades);

  propiedades$ = this.propiedadesSubject.asObservable();

  agregarPropiedad(propiedad: Omit<Propiedad, 'id'>) {
    const nuevaPropiedad: Propiedad = { ...propiedad, id: uuidv4() };
    this.propiedades.push(nuevaPropiedad);
    this.propiedadesSubject.next(this.propiedades);
  }

  eliminarPropiedad(id: string) {
    this.propiedades = this.propiedades.filter(p => p.id !== id);
    this.propiedadesSubject.next(this.propiedades);
  }

  obtenerPropiedades(): Propiedad[] {
    return [...this.propiedades];
  }
}
