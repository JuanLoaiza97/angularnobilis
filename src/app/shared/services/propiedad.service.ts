import { Injectable } from '@angular/core';
import { Propiedad } from '../models/propiedad.model';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private readonly STORAGE_KEY = 'nobilis_propiedades';
  private propiedades: Propiedad[] = [];
  private propiedadesSubject = new BehaviorSubject<Propiedad[]>(this.propiedades);
  
  propiedades$ = this.propiedadesSubject.asObservable();

  constructor() {
    this.cargarPropiedadesIniciales();
  }

  private cargarPropiedadesIniciales(): void {
    // Cargar desde localStorage
    const propiedadesGuardadas = localStorage.getItem(this.STORAGE_KEY);
    
    if (propiedadesGuardadas) {
      this.propiedades = JSON.parse(propiedadesGuardadas);
    } else {
      // Datos iniciales de ejemplo
      this.propiedades = [
        {
          id: uuidv4(),
          titulo: 'Casa de lujo en Bogotá',
          descripcion: 'Hermosa casa con acabados de alta gama',
          imagen: 'assets/img/casa1.jpg',
          precio: '$1,200,000',
          ubicacion: 'Bogotá'
        },
        {
          id: uuidv4(),
          titulo: 'Apartamento moderno',
          descripcion: 'Amplio apartamento en zona exclusiva',
          imagen: 'assets/img/casa2.jpg',
          precio: '$850,000',
          ubicacion: 'Medellín'
        }
      ];
      this.guardarEnLocalStorage();
    }
    
    this.propiedadesSubject.next(this.propiedades);
  }

  agregarPropiedad(propiedad: Omit<Propiedad, 'id'>): void {
    const nuevaPropiedad: Propiedad = {
      ...propiedad,
      id: uuidv4()
    };
    
    this.propiedades.push(nuevaPropiedad);
    this.actualizarPropiedades();
  }

  eliminarPropiedad(id: string): void {
    this.propiedades = this.propiedades.filter(p => p.id !== id);
    this.actualizarPropiedades();
  }

  obtenerPropiedades(): Propiedad[] {
    return [...this.propiedades];
  }

  obtenerPropiedadPorId(id: string): Propiedad | undefined {
    return this.propiedades.find(p => p.id === id);
  }

  private actualizarPropiedades(): void {
    this.guardarEnLocalStorage();
    this.propiedadesSubject.next(this.propiedades);
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.propiedades));
  }

  // Método para desarrollo - limpiar todas las propiedades (opcional)
  limpiarPropiedades(): void {
    this.propiedades = [];
    localStorage.removeItem(this.STORAGE_KEY);
    this.propiedadesSubject.next(this.propiedades);
  }
}