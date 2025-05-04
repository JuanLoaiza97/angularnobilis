import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup;

  // Estados para manejar la UI
  isLoading = false;
  showPassword = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.showValidationErrors();
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    // Simulamos un pequeño delay para mejor UX
    setTimeout(() => {
      const loginSuccess = this.authService.login(email, password);
      this.isLoading = false;

      if (loginSuccess) {
        this.handleLoginSuccess();
      } else {
        this.handleLoginError();
      }
    }, 800);
  }

  /**
   * Muestra errores de validación
   */
  private showValidationErrors(): void {
    const form = this.loginForm;

    // Verificar primero si el formulario está vacío
    if (form.get('email')?.hasError('required') && form.get('password')?.hasError('required')) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Debes ingresar tu correo y contraseña',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    // Mostrar errores específicos
    if (form.get('email')?.invalid) {
      const errors = form.get('email')?.errors;
      this.showFieldError('email', errors);
      return;
    }

    if (form.get('password')?.invalid) {
      const errors = form.get('password')?.errors;
      this.showFieldError('password', errors);
    }
  }

  /**
   * Muestra el error específico de un campo
   */
  private showFieldError(field: string, errors: any): void {
    const fieldNames: { [key: string]: string } = {
      email: 'Correo electrónico',
      password: 'Contraseña'
    };

    let errorMessage = '';

    if (errors?.['required']) {
      errorMessage = 'Este campo es obligatorio';
    } else if (errors?.['email']) {
      errorMessage = 'Debe ser un correo electrónico válido';
    } else if (errors?.['minlength']) {
      errorMessage = `La contraseña debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    }

    Swal.fire({
      icon: 'error',
      title: 'Error de validación',
      html: `<strong>${fieldNames[field]}:</strong> ${errorMessage}`,
      confirmButtonText: 'Entendido'
    });
  }

  /**
   * Maneja el éxito del login
   */
  private handleLoginSuccess(): void {
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigate(['/miperfil']);
    });
  }

  /**
   * Maneja errores de login
   */
  private handleLoginError(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error al iniciar sesión',
      text: 'Correo o contraseña incorrectos',
      confirmButtonText: 'Entendido'
    });
  }

  /**
   * Alternar visibilidad de contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}