import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {
  propiedades = [
    { id: '1', titulo: 'Casa de lujo', descripcion: 'Hermosa casa', imagen: 'assets/img/casa1.jpg' },
    { id: '2', titulo: 'Apartamento moderno', descripcion: 'Ubicado en el centro', imagen: 'assets/img/casa2.jpg' },
    { id: '3', titulo: 'Mansión', descripcion: 'Increíble mansión', imagen: 'assets/img/casa3.jpg' },
  ];

  obtenerPropiedadPorId(id: string) {
    return this.propiedades.find(p => p.id === id);
  }

  obtenerTodas() {
    return this.propiedades;
  }
}
