import { Component, inject, Input } from '@angular/core';
import { DeseadosService } from '../../shared/services/deseados.service';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Propiedad } from '../../shared/models/propiedad.model';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propiedades-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './propiedades-card.component.html',
  styleUrl: './propiedades-card.component.css'
})
export class PropiedadesCardComponent {
  authService = inject(AuthService);
  deseadosService = inject(DeseadosService);

  @Input() propiedades: Propiedad[] = [
    {
      id: '1',
      titulo: 'Casa de lujo',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      imagen: 'assets/img/casa1.jpg',
      precio: '$100,000',       
      ubicacion: 'Bogotá'       
    },
    {
      id: '2',
      titulo: 'Mansión exclusiva',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      imagen: 'assets/img/casa2.jpg',
      precio: '$80,000',        
      ubicacion: 'Medellín'     
    },
    {
      id: '3',
      titulo: 'Apartamento moderno',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      imagen: 'assets/img/casa3.jpg',
      precio: '$500,000',       
      ubicacion: 'Cartagena'    
    }
  ];

  toggleFavorito(propiedadId: string): void {
    const user = this.authService.getCurrentUser();
    
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso requerido',
        text: 'Debes iniciar sesión para guardar favoritos',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3f51b5'
      });
      return;
    }

    if (this.esFavorito(propiedadId)) {
      this.deseadosService.eliminarDeseado(user.email, propiedadId);
    } else {
      this.deseadosService.agregarADeseados(user.email, propiedadId);
    }
  }

  esFavorito(propiedadId: string): boolean {
    const user = this.authService.getCurrentUser();
    return user ? this.deseadosService.obtenerDeseados(user.email).includes(propiedadId) : false;
  }
}