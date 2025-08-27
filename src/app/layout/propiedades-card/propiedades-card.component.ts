import { Component, inject, Input, OnInit } from '@angular/core';
import { DeseadosService } from '../../shared/services/deseados.service';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Propiedad } from '../../shared/models/propiedad.model';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { PropiedadService } from '../../shared/services/propiedad.service';

@Component({
  selector: 'app-propiedades-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './propiedades-card.component.html',
  styleUrls: ['./propiedades-card.component.css']
})
export class PropiedadesCardComponent implements OnInit {
  // Servicios
  authService = inject(AuthService);
  deseadosService = inject(DeseadosService);
  propiedadService = inject(PropiedadService);

  // Input/Output
  @Input() propiedades: Propiedad[] = [];
  @Input() showFavoriteButton: boolean = true;
  
  // Estados
  loadingStates: { [key: string]: boolean } = {};

  ngOnInit(): void {
    // Carga inicial si no vienen por input
    if (this.propiedades.length === 0) {
      this.propiedades = this.propiedadService.obtenerPropiedades();
    }
  }

  async toggleFavorito(propiedadId: string): Promise<void> {
    const user = this.authService.getCurrentUser();
    
    if (!user) {
      this.showLoginAlert();
      return;
    }

    this.loadingStates[propiedadId] = true;
    
    try {
      if (this.esFavorito(propiedadId)) {
        await this.deseadosService.eliminarDeseado(user.email, propiedadId);
        this.showToast('Removido de favoritos', 'success');
      } else {
        await this.deseadosService.agregarADeseados(user.email, propiedadId);
        this.showToast('Agregado a favoritos', 'success');
      }
    } catch (error) {
      this.showToast('Ocurrió un error', 'error');
    } finally {
      this.loadingStates[propiedadId] = false;
    }
  }

  esFavorito(propiedadId: string): boolean {
    const user = this.authService.getCurrentUser();
    return user ? this.deseadosService.obtenerDeseados(user.email).includes(propiedadId) : false;
  }

  private showLoginAlert(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso requerido',
      text: 'Debes iniciar sesión para guardar favoritos',
      confirmButtonText: 'Iniciar sesión',
      confirmButtonColor: '#3f51b5',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.redirectToLogin();
      }
    });
  }

  private showToast(message: string, icon: 'success' | 'error'): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon,
      title: message
    });
  }
}