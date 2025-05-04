import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeseadosService {
  private storageKey = 'deseados';

  obtenerDeseados(userEmail: string): string[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data)[userEmail] || [] : [];
  }

  agregarADeseados(userEmail: string, propiedadId: string): void {
    const allDeseados = this.obtenerTodosDeseados();
    if (!allDeseados[userEmail]) {
      allDeseados[userEmail] = [];
    }
    
    if (!allDeseados[userEmail].includes(propiedadId)) {
      allDeseados[userEmail].push(propiedadId);
      this.guardarTodosDeseados(allDeseados);
    }
  }

  eliminarDeseado(userEmail: string, propiedadId: string): void {
    const allDeseados = this.obtenerTodosDeseados();
    if (allDeseados[userEmail]) {
      allDeseados[userEmail] = allDeseados[userEmail].filter(id => id !== propiedadId);
      this.guardarTodosDeseados(allDeseados);
    }
  }

  toggleDeseado(userEmail: string, propiedadId: string): boolean {
    const isDeseado = this.obtenerDeseados(userEmail).includes(propiedadId);
    if (isDeseado) {
      this.eliminarDeseado(userEmail, propiedadId);
    } else {
      this.agregarADeseados(userEmail, propiedadId);
    }
    return !isDeseado;
  }

  private obtenerTodosDeseados(): { [key: string]: string[] } {
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }

  private guardarTodosDeseados(deseados: { [key: string]: string[] }): void {
    localStorage.setItem(this.storageKey, JSON.stringify(deseados));
  }
}