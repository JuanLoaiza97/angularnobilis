import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

import { FooterComponent } from '../../layout/footer/footer.component';
import { PropiedadesCardComponent } from '../../layout/propiedades-card/propiedades-card.component';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { DeseadosService } from '../../shared/services/deseados.service';
import { PropiedadesService } from '../../shared/services/propieades-service.service';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, PropiedadesCardComponent],
  templateUrl: './miperfil.component.html',
  styleUrl: './miperfil.component.css'
})
export class MiperfilComponent {

  authService = inject(AuthService);
  deseadosService = inject(DeseadosService);
  propiedadesService = inject(PropiedadesService);
  router = inject(Router);

  user = this.authService.getCurrentUser();
  favoritos: any[] = [];

  ngOnInit() {
    if (this.user) {
      const ids = this.deseadosService.obtenerDeseados(this.user.email);
      const todas = this.propiedadesService.obtenerTodas();
      this.favoritos = todas.filter(p => ids.includes(p.id));
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
