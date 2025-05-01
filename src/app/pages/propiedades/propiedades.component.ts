import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { PropiedadesCardComponent } from '../../layout/propiedades-card/propiedades-card.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [NavbarComponent,PropiedadesCardComponent,FooterComponent],
  templateUrl: './propiedades.component.html',
  styleUrl: './propiedades.component.css'
})
export class PropiedadesComponent {

}
