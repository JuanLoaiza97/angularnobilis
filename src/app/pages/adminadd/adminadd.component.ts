import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../layout/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../layout/footer-admin/footer-admin.component';

@Component({
  selector: 'app-adminadd',
  standalone: true,
  imports: [NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './adminadd.component.html',
  styleUrl: './adminadd.component.css'
})
export class AdminaddComponent {

}
