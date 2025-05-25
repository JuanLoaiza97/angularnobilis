import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../shared/services/admin-auth.service';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginadmin',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './loginadmin.component.html',
  styleUrl: './loginadmin.component.css'
})
export class LoginadminComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AdminAuthService, private router: Router) {}

  async onSubmit() {
    const esValido = await this.authService.validarCredenciales(this.email, this.password);
    if (esValido) {
      this.router.navigate(['/adminadd']);
    } else {
      alert('Credenciales inválidas');
    }
  }
}
