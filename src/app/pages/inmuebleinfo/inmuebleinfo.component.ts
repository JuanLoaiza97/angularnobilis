import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { Propiedad } from '../../shared/models/propiedad.model';
import { ActivatedRoute } from '@angular/router';
import { PropiedadService } from '../../shared/services/propiedad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inmuebleinfo',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, CommonModule],
  templateUrl: './inmuebleinfo.component.html',
  styleUrl: './inmuebleinfo.component.css'
})
export class InmuebleinfoComponent {
  propiedad?: Propiedad;

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService
  ) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const propiedades = this.propiedadService.obtenerPropiedades();
      this.propiedad = propiedades.find(p => p.id === id);
    }
  }
}
