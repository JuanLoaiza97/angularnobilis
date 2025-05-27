import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { PropiedadesCardComponent } from '../../layout/propiedades-card/propiedades-card.component';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { DeseadosService } from '../../shared/services/deseados.service';
import { PropiedadService } from '../../shared/services/propiedad.service';
import { Propiedad } from '../../shared/models/propiedad.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    PropiedadesCardComponent
  ],
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
  // Servicios
  authService = inject(AuthService);
  deseadosService = inject(DeseadosService);
  propiedadService = inject(PropiedadService);
  router = inject(Router);

  // Datos
  user = this.authService.getCurrentUser();
  favoritos: Propiedad[] = [];
  isLoading = true;

  // Suscripciones
  private propiedadesSubscription?: Subscription;

  ngOnInit() {
    this.cargarFavoritos();
  }

  ngOnDestroy() {
    this.propiedadesSubscription?.unsubscribe();
  }

  cargarFavoritos() {
    if (!this.user) return;

    this.isLoading = true;
    const idsFavoritos = this.deseadosService.obtenerDeseados(this.user.email);
    
    // Carga inicial
    const propiedades = this.propiedadService.obtenerPropiedades();
    this.filtrarFavoritos(propiedades, idsFavoritos);

    // Suscripción para cambios en tiempo real
    this.propiedadesSubscription = this.propiedadService.propiedades$.subscribe(
      propiedades => {
        this.filtrarFavoritos(propiedades, idsFavoritos);
      }
    );
  }

  private filtrarFavoritos(propiedades: Propiedad[], idsFavoritos: string[]) {
    this.favoritos = propiedades.filter(p => idsFavoritos.includes(p.id));
    this.isLoading = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  actualizarFavoritos() {
    if (this.user) {
      const ids = this.deseadosService.obtenerDeseados(this.user.email);
      this.favoritos = this.propiedadService.obtenerPropiedades()
        .filter(p => ids.includes(p.id));
    }
  }
}