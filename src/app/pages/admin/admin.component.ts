import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../shared/models/propiedad.model';
import { CommonModule } from '@angular/common';
import { PropiedadService } from '../../shared/services/propiedad.service';
import { FooterAdminComponent } from "../../layout/footer-admin/footer-admin.component";
import { NavbarAdminComponent } from "../../layout/navbar-admin/navbar-admin.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FooterAdminComponent, NavbarAdminComponent, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  propiedades: Propiedad[] = [];

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit() {
    this.propiedadService.propiedades$.subscribe((data: Propiedad[]) => {
      this.propiedades = data;
    });
  }

  eliminar(id: string) {
    this.propiedadService.eliminarPropiedad(id);
  }
}
