import { Component } from '@angular/core';
import { PropiedadesCardComponent } from '../../layout/propiedades-card/propiedades-card.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { NosotrosInfoComponent } from '../../layout/nosotros-info/nosotros-info.component';
import { RegistroComponent } from '../registro/registro.component';
import { NosotrosComponent } from "../nosotros/nosotros.component";
import { RegistrarseComponent } from "../../layout/registrarse/registrarse.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [PropiedadesCardComponent, FooterComponent, NosotrosInfoComponent, RegistroComponent, NosotrosComponent, RegistrarseComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
