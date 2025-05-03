import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeseadosService {
  private storageKey = 'deseados';

  obtenerDeseados(userEmail: string): string[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];

    const deseados = JSON.parse(data);
    return deseados[userEmail] || [];
  }

  agregarADeseados(userEmail: string, propiedadId: string) {
    const data = localStorage.getItem(this.storageKey);
    const deseados = data ? JSON.parse(data) : {};

    if (!deseados[userEmail]) {
      deseados[userEmail] = [];
    }

    // Evitar duplicados
    if (!deseados[userEmail].includes(propiedadId)) {
      deseados[userEmail].push(propiedadId);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(deseados));
  }
}
