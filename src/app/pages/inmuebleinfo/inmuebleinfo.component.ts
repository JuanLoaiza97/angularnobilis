import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-inmuebleinfo',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './inmuebleinfo.component.html',
  styleUrl: './inmuebleinfo.component.css'
})
export class InmuebleinfoComponent {

}
