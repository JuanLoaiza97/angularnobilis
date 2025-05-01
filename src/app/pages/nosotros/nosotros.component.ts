import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { RegistrarseComponent } from '../../layout/registrarse/registrarse.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { NosotrosInfoComponent } from '../../layout/nosotros-info/nosotros-info.component';


@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [NavbarComponent, RegistrarseComponent, FooterComponent,NosotrosInfoComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

}
