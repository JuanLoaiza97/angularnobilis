// import { Component, OnInit } from '@angular/core';
// import { NavbarComponent } from '../../layout/navbar/navbar.component';
// import { FooterComponent } from '../../layout/footer/footer.component';
// import { RouterLink } from '@angular/router';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-registro',
//   standalone: true,
//   imports: [NavbarComponent,FooterComponent, RouterLink, ReactiveFormsModule],
//   templateUrl: './registro.component.html',
//   styleUrl: './registro.component.css'
// })


// export class RegistroComponent implements OnInit {
//   registroForm!: FormGroup;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.registroForm = this.fb.group({
//       nombre: ['', Validators.required],
//       apellidos: ['', Validators.required],
//       telefono: ['', Validators.required],
//       pais: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       confirmPassword: ['', Validators.required],
//       tipoPropiedad: ['', Validators.required],
//       ubicacion: ['', Validators.required],
//     });
//   }

//   onSubmit() {
//     if (this.registroForm.valid) {
//       console.log(this.registroForm.value);
//     } else {
//       console.log("Formulario inválido");
//     }
//   }
// }



import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  registroForm = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: (form) => {
      const pass = form.get('password')?.value;
      const repass = form.get('confirmPassword')?.value;
      return pass === repass ? null : { passwordMismatch: true };
    }
  });

  onSubmit() {
    if (this.registroForm.invalid) {
      Swal.fire({ icon: 'error', text: 'Todos los campos son obligatorios' });
      return;
    }

    const user = this.registroForm.getRawValue();

    const success = this.authService.registry(user);

    if (success) {
      this.registroForm.reset();
      this.router.navigateByUrl('/'); // o a donde quieras redirigir
    }
  }
}
