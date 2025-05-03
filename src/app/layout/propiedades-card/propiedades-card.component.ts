import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeseadosService } from '../../shared/services/deseados.service';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-propiedades-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './propiedades-card.component.html',
  styleUrl: './propiedades-card.component.css'
})


export class PropiedadesCardComponent {
  authService = inject(AuthService);
  deseadosService = inject(DeseadosService);

  propiedades = [
    {
      id: '1',
      titulo: 'Casa de lujo',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      imagen: 'assets/img/casa1.jpg'
    },
    {
      id: '2',
      titulo: 'Apartamento moderno',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      imagen: 'assets/img/casa2.jpg'
    },
    {
      id: '3',
      titulo: 'Mansión elegante',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      imagen: 'assets/img/casa3.jpg'
    }
  ];

  agregarAFavoritos(id: string) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.deseadosService.agregarADeseados(user.email, id);
      alert('Propiedad guardada en deseados.');
    } else {
      alert('Debes iniciar sesión para guardar favoritos.');
    }
  }
  
}
