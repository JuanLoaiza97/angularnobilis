import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

import { FooterComponent } from '../../layout/footer/footer.component';
import { PropiedadesCardComponent } from '../../layout/propiedades-card/propiedades-card.component';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [NavbarComponent, PropiedadesCardComponent, FooterComponent, CommonModule],
  templateUrl: './miperfil.component.html',
  styleUrl: './miperfil.component.css'
})
export class MiperfilComponent {
  authService = inject(AuthService);
  router = inject(Router);
  user = this.authService.getCurrentUser();

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
