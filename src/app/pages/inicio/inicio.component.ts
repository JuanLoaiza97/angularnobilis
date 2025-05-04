import { Component, computed, inject } from '@angular/core';
import { PropiedadesCardComponent } from '../../layout/propiedades-card/propiedades-card.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { NosotrosInfoComponent } from '../../layout/nosotros-info/nosotros-info.component';
import { RegistroComponent } from '../registro/registro.component';
import { NosotrosComponent } from "../nosotros/nosotros.component";
import { RegistrarseComponent } from "../../layout/registrarse/registrarse.component";
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NavbarComponent } from "../../layout/navbar/navbar.component"; // Asegúrate de que esta ruta esté bien
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    PropiedadesCardComponent,
    FooterComponent,
    NosotrosInfoComponent,
    RegistroComponent,
    NosotrosComponent,
    RegistrarseComponent,
    RouterLink,
    NavbarComponent,
    CommonModule
],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  authService = inject(AuthService);
  isLogged = computed(() => this.authService.isLogged());
}
