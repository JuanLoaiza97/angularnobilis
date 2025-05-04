import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registroForm: FormGroup;

  // Nombres amigables para los campos
  private fieldNames: { [key: string]: string } = {
    nombre: 'Nombre',
    apellidos: 'Apellidos',
    telefono: 'Teléfono',
    pais: 'País',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    tipoPropiedad: 'Tipo de propiedad',
    ubicacion: 'Ubicación'
  };

  constructor() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      pais: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      tipoPropiedad: ['', Validators.required],
      ubicacion: ['', Validators.required]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  /**
   * Validador personalizado para coincidencia de contraseñas
   */
  private passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.showFirstValidationError();
      return;
    }

    const formValue = this.registroForm.value;
    const success = this.authService.registry(formValue);

    if (success) {
      this.showSuccessAlert();
    } else {
      this.showEmailExistsAlert();
    }
  }

  /**
   * Muestra el primer error de validación encontrado
   */
  private showFirstValidationError(): void {
    // Verificar primero el error de coincidencia de contraseñas
    if (this.registroForm.hasError('passwordMismatch')) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    // Buscar el primer campo inválido
    for (const [controlName, control] of Object.entries(this.registroForm.controls)) {
      if (control.invalid) {
        this.showFieldError(controlName, control.errors);
        return;
      }
    }
  }

  /**
   * Muestra el error específico de un campo
   */
  private showFieldError(controlName: string, errors: any): void {
    const fieldName = this.fieldNames[controlName] || controlName;
    let errorMessage = '';

    if (errors?.['required']) {
      errorMessage = 'Este campo es obligatorio';
    } else if (errors?.['email']) {
      errorMessage = 'Debe ser un correo electrónico válido';
    } else if (errors?.['pattern']) {
      if (controlName === 'telefono') {
        errorMessage = 'Debe tener exactamente 10 dígitos';
      } else if (controlName === 'password') {
        errorMessage = 'Debe contener al menos una mayúscula, una minúscula, un número y 8 caracteres';
      }
    } else if (errors?.['minlength']) {
      errorMessage = `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    } else {
      errorMessage = 'Valor inválido';
    }

    Swal.fire({
      icon: 'error',
      title: 'Error de validación',
      html: `<strong>${fieldName}:</strong> ${errorMessage}`,
      confirmButtonText: 'Entendido'
    });
  }

  /**
   * Muestra alerta de éxito en registro
   */
  private showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'Tu cuenta ha sido creada correctamente',
      confirmButtonText: 'Continuar'
    }).then(() => {
      this.registroForm.reset();
      this.router.navigate(['/']);
    });
  }

  /**
   * Muestra alerta cuando el email ya existe
   */
  private showEmailExistsAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: 'El correo electrónico ya está registrado',
      confirmButtonText: 'Entendido'
    });
  }
}