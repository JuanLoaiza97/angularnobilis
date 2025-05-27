import { Component, inject, OnInit } from '@angular/core';
import { PropiedadesCardComponent } from '../../layout/propiedades-card/propiedades-card.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { PropiedadService } from '../../shared/services/propiedad.service';
import { Propiedad } from '../../shared/models/propiedad.model';
import { RouterLink } from '@angular/router';
import { NosotrosInfoComponent } from '../../layout/nosotros-info/nosotros-info.component';
import { RegistrarseComponent } from "../../layout/registrarse/registrarse.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    PropiedadesCardComponent,
    NosotrosInfoComponent,
    RegistrarseComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // Servicios
  authService = inject(AuthService);
  propiedadService = inject(PropiedadService);

  // Propiedades
  propiedades: Propiedad[] = [];
  isLogged = this.authService.isLogged;

  ngOnInit(): void {
    this.cargarPropiedades();
  }

  cargarPropiedades() {
    // Versión con datos iniciales de respaldo
    const propiedadesIniciales = this.propiedadService.obtenerPropiedades();
    
    if (propiedadesIniciales.length > 0) {
      this.propiedades = propiedadesIniciales;
    } else {
      // Datos de ejemplo si no hay propiedades
      this.propiedades = [
        {
          id: '1',
          titulo: 'Casa de lujo',
          descripcion: 'Propiedad de ejemplo',
          imagen: 'assets/img/casa1.jpg',
          precio: '$100,000',
          ubicacion: 'Bogotá'
        }
      ];
    }

    // Suscripción a cambios futuros
    this.propiedadService.propiedades$.subscribe(propiedades => {
      this.propiedades = propiedades;
    });
  }
}