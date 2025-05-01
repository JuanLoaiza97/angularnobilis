import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

import { FooterComponent } from '../../layout/footer/footer.component';
import { PropiedadesCardComponent } from '../../layout/propiedades-card/propiedades-card.component';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [NavbarComponent, PropiedadesCardComponent, FooterComponent],
  templateUrl: './miperfil.component.html',
  styleUrl: './miperfil.component.css'
})
export class MiperfilComponent {

}
