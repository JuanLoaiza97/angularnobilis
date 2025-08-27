import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../layout/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../layout/footer-admin/footer-admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropiedadService } from '../../shared/services/propiedad.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-adminadd',
  standalone: true,
  imports: [NavbarAdminComponent, FooterAdminComponent, CommonModule, FormsModule],
  templateUrl: './adminadd.component.html',
  styleUrl: './adminadd.component.css'
})
export class AdminaddComponent {
  propiedad = {
    titulo: '',
    descripcion: '',
    imagen: '',
    precio: '',
    ubicacion: ''
  };


  constructor(private propiedadService: PropiedadService, private router: Router) {}

  guardarPropiedad(form: any) {
    if (form.valid) {
      console.log('ANTES DE GUARDAR:', this.propiedad);
      this.propiedadService.agregarPropiedad({ ...this.propiedad });
      form.reset(); // Limpia el formulario
    } else {
      // Marca todos los campos como "tocados" para mostrar los errores
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
    }
  }
}
